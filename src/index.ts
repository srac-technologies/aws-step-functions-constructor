import { buildGraph } from './buildGraph'
import { getStates } from './stepFunction'
import express from 'express'
import AWS from 'aws-sdk'

const app = express()
app.set("view engine", "ejs")
app.use(express.static('public'))

app.get("/state-machines", (req, res) => {
  new AWS.StepFunctions({
    endpoint: "http://localhost:8083",
    region: "us-east-1",
  }).listStateMachines((err, d) => {
    res.render('state-machine-list.ejs', { stateMachines: d.stateMachines })
  })
})
app.get("/state-machines/:name", (req, res) => {

  Promise.all(
    [
      new AWS.StepFunctions({
        endpoint: "http://localhost:8083",
        region: "us-east-1",
      }).describeStateMachine({ stateMachineArn: `arn:aws:states:us-east-1:123456789012:stateMachine:${req.params['name']}` }).promise(),
      new AWS.StepFunctions({
        endpoint: "http://localhost:8083",
        region: "us-east-1",
      }).listExecutions({ stateMachineArn: `arn:aws:states:us-east-1:123456789012:stateMachine:${req.params['name']}` }).promise(),
    ]
  ).then(([{ definition }, { executions }]) => {
    const g = buildGraph(JSON.parse(definition))
    res.render('state-machine-detail.ejs', { graph: { serializedGraph: g, states: getStates(JSON.parse(definition)) }, executions })
  })
})

app.get("/state-machines/:stateMachineName/:executionName", (req, res) => {
  new AWS.StepFunctions({
    endpoint: "http://localhost:8083",
    region: "us-east-1",
  }).getExecutionHistory({ executionArn: `arn:aws:states:us-east-1:123456789012:execution:${req.params['stateMachineName']}:${req.params['executionName']}` }, (err, { events }) => {
    res.render('execution-detail.ejs', {
      events
    })
  })
})


app.listen(3003)