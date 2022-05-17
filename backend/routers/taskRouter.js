import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import { generateToken,isAuth} from '../utils.js';

const taskRouter = express.Router();

taskRouter.get('/seed',async (req, res) => {
    const createdTask = await Task.insrtMany(data.tasks);
    res.send({createTask})
  }
);


taskRouter.post(
  "/create",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = new Task({
        name:req.body.name,
        description: req.body.description,
        taskTheme: req.body.taskTheme,
        taskModel: req.body.taskModel,
        week:req.body.week,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        user: req.body.user,
        taskState: req.body.taskState,
        report:req.body.report });
    const createdTask = tasks.sve();
    res.send({
      _id: createdTask._id,
      name:createdTask.name,
      description: createdTask.description,
      taskTheme: createdTask.taskTheme,
      taskModel: createdTask.taskModel,
      week:createdTask.week,
      startDate: createdTask.startDate,
      endDate: createdTask.endDate,
      user: createdTask.user,
      taskState: createdTask.taskState,
      report:createdTask.report
      
    });
  })
);

taskRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
      res.send(tasks);
    } else {
      res.status(404).send({ message: "Components Not Found" });
    }
  })
);

taskRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.find()
                .populate('taskTheme','name')
                .populate('taskModel','name')
                .populate('week','name')
                .populate('user','firstName')
                .populate('taskState','name')
                .populate('report','name')
               
    res.send({ tasks });
  })
);

taskRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
        const deletetasks = await tasks.remove();
        res.send({ message: "tasks Deleted", tasks: deletetasks });
     }else {
      res.status(404).send({ message: "tasks Not Found" });
    }
  })
);
taskRouter.put(
  '/:id',
 // isAuth,
  //isAdmin,
  expressAsyncHandler(async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    if (tasks) {
       tasks.name=req.body.name||tasks.name;
       tasks.description=req.body.description||tasks.description;
       tasks.taskTheme=req.body.taskTheme||tasks.taskTheme;
       tasks.taskModel=req.body.taskModel||tasks.taskModel;
       tasks.week=req.body.week||tasks.week;
       tasks.startDate=req.body.startDate||tasks.startDate;
       tasks.endDate=req.body.endDate||tasks.endDate;
       tasks.user=req.body.user||tasks.user;
       tasks.taskState=req.body.taskState||tasks.taskState;
       tasks.report=req.body.report||tasks.report;
     const updatedTask = await tasks.save();
      res.send({ message: 'Components Updated', Tasks: updatedTask });
    } else {
      res.status(404).send({ message: 'Components Not Found' });
    }
  })
);


export default taskRouter;