import { taskService } from "../server/TaskService";
import axios, { type AxiosResponse } from "axios";
import type { Task } from "../types/code";

jest.mock("axios");

describe("getTaskList", () => {
  test("タスクリストが取得できる", async () => {
    const uid = "00000000000000000001";
    const expected: Task[] = [
      { taskName: "todo1", statusCd: "0" },
      { taskName: "todo2", statusCd: "1" },
      { taskName: "todo3", statusCd: "2" },
    ];
    (axios.get as any).mockResolvedValue({ data: expected });
    const taskList: Task[] = await taskService.getTaskList(uid);
    expect(taskList).toEqual(expected);
  });
  test("何も取得できなかった場合は空の配列が返る", async () => {
    const uid = "00000000000000000001";
    const expected: Task[] = [];

    (axios.get as any).mockResolvedValue({ data: [] });
    const taskList: Task[] = await taskService.getTaskList(uid);
    expect(taskList).toEqual(expected);
  });
});
