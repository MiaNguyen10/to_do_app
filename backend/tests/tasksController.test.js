const tasksController = require("../controller/tasksController");
const tasksModel = require("../models/tasksModel");

jest.mock("../models/tasksModel");

describe("create task", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        user_id: 1,
        title: "Test task",
        status_id: 2,
        priority_id: 3,
        description: "Test description",
        due_date: "2025-07-01",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new task and return 201", async () => {
    tasksModel.createTask.mockResolvedValue(123); // Mock the createTask method to return a task ID

    await tasksController.createTask(req, res);

    expect(tasksModel.createTask).toHaveBeenCalledWith(
      1,
      "Test task",
      2,
      3,
      "Test description",
      "2025-07-01"
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Task created successfully",
      taskId: 123,
    });
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = {};
    await tasksController.createTask(req, res);
    expect(res.status).toHaveBeenLastCalledWith(400);
    expect(res.json).toHaveBeenLastCalledWith({
      message: "Missing required fields",
    });
  });

  it("should handle server errors", async () => {
    tasksModel.createTask.mockRejectedValue(new Error("DB error"));
    await tasksController.createTask(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenLastCalledWith({
      message: "Server error",
      error: "DB error",
    });
  });
});
