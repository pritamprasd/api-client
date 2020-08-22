import React, { Component } from "react";
import './BackEndServiceStatus';
import Axios from "axios";


export interface Props {
}
enum ServiceStatus {
    UP,
    DOWN
}
interface State {
    status: ServiceStatus;
}
class BackEndServiceStatus extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            status: ServiceStatus.DOWN
        }
        this.refreshStatus = this.refreshStatus.bind(this);
        this.getStatusImage = this.getStatusImage.bind(this);
        setInterval(this.refreshStatus, serviceStatusRefreshRate);
        console.log("constructor called...")
    }

    getStatusImage() {
        if (this.state.status === ServiceStatus.UP) {
            return (
                <img
                    src={require('../images/g.png')}
                    alt="service down image" id=".status_image" width={iconsize} height={iconsize} />
            );
        } else {
            return (
                <img
                    src={require('../images/r.png')}
                    alt="service down image" id=".status_image" width={iconsize} height={iconsize} />
            );
        }
    }

    refreshStatus() {
        console.log("Refreshing status now: " + currentDate());
        let config = {
            headers: {
                'token': "$x$x$x",
            }
        }
        Axios.get(healthCheckUrl, config).then(res => {
            res.data.status === "UP" ? this.setStatus(ServiceStatus.UP) : this.setStatus(ServiceStatus.DOWN);
        }).catch((e) => {
            console.error(e);
            if (this.state.status === ServiceStatus.UP) {
                this.setStatus(ServiceStatus.DOWN);
            }
        });
    }
    setStatus(s: ServiceStatus) {
        this.setState(
            {
                status: s
            }
        );
    }
    render() {
        return (
            <div>
                {this.getStatusImage()}
            </div>
        );
    }
}
export default BackEndServiceStatus;

function currentDate() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date;
}

const port = "8110";
const backEndBaseUrl="http://localhost:"+port;
const healthCheckUrl=backEndBaseUrl+"/health";
const serviceStatusRefreshRate = 2000;
const iconsize = "24px"