import { Deta } from "deta";

class DetaDB {
  up = false;

  constructor(project_key) {
    this.project_key = project_key;
  }

  async init() {
    this.deta = new Deta(this.project_key);
    this.up = true;
    this.users = this.deta.Base("users");
    this.stats = this.deta.Base("stats");
    const json_showed = await this.stats.get("json_showed");
    if (!json_showed) {
      this.stats.putMany([
        { key: "json_showed", value: 0 },
        { key: "total_users", value: 0 },
      ]);
    }
  }

  async writeUser(userId, username) {
    const user = await this.getUser(userId);
    if (user) return { status: "exists", user: user };
    const newUser = await this.users.put({
      key: String(userId),
      username: username === undefined ? "x" : username,
      userId: userId,
      json_showed: 0,
    });
    await this.stats.update(
      {
        value: this.stats.util.increment(),
      },
      "total_users"
    );
    return { status: "added", user: newUser };
  }

  async getUser(userId) {
    return await this.users.get(String(userId));
  }

  async getUsersCount() {
    const { value } = await this.stats.get("total_users");
    return value;
  }

  async getJsonShowedCount() {
    const { value } = await this.stats.get("json_showed");
    return value;
  }

  async getJsonShowedCountForUser(userId) {
    const { json_showed } = await this.getUser(userId);
    return json_showed;
  }

  async incrementJsonShowed(userId) {
    await this.stats.update(
      {
        value: this.stats.util.increment(),
      },
      "json_showed"
    );
    await this.users.update(
      {
        json_showed: this.users.util.increment(),
      },
      String(userId)
    );
  }
}

export default DetaDB;
