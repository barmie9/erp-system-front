import React from "react";
import Login from "./Login";
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Register from "./Register";
import Users from "./Users";
import Orders from "./Orders";
import OrderDetails from "./orderDetailsScreen/OrderDetails";
import UserTasks from "./UserTasks";
import UserTask from "./userTask/UserTask";
import AdminTask from "./adminTask/AdminTask";
import Companies from "./companies/Companies";
import Warehouse from "./warehouse/Warehouse";
import Devices from "./devices/Devices";

function MainContent(props) {

    return (
        <div className="right-content">
            {props.role === 'ADMIN' && <AdminContent />}
            {props.role === 'USER' && <UserContent />}
            {props.role === null && <NoUserContent />}
        </div>
    )
}

function AdminContent() {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/orders" Component={Orders} />
            <Route path="/companies" Component={Companies} />
            <Route path="/magazin" Component={Warehouse} />
            <Route path="/devices" Component={Devices} />
            <Route path="/users" Component={Users} />
            <Route path="/orders/details" Component={OrderDetails} />
            <Route path="/orders/details/userTask" Component={AdminTask} />
        </Routes>
    )
}

function UserContent() {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/tasks" Component={UserTasks} />
            <Route path="/tasks/task" Component={UserTask} />
        </Routes>
    )
}

function NoUserContent() {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="register" Component={Register} />
        </Routes>
    )
}

export default MainContent;