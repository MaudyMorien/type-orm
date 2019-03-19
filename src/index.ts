import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import PageController from "./pages/controller"
import FluffballControler from './fluffballs/controller'
import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [PageController, FluffballControler]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))