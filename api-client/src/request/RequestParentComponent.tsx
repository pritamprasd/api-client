import React, { Component } from 'react';
import './RequestParentComponent.css'
import Axios from "axios";

export interface Props {
    name: string;
}

interface State {
    url: string;
    response: string;
}

class RequestParentComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            url: "",
            response: ""
        }
        this.sendRequest = this.sendRequest.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.setResponse = this.setResponse.bind(this);
    }

    setUrl(u: string) {
        this.setState({
            url: u
        });
    }
    setResponse(r: string) {
        this.setState({
            response: r
        });
    }

    sendRequest() {
        if (isValidUrl(this.state.url)) {
            console.log("Calling : " + getNormalizedUrl(this.state.url))
            let config = {
                headers: {
                }
            };
            const requestBody = {
                "method": "GET",
                "url": getNormalizedUrl(this.state.url),
            };
            Axios.post(
                backendServiceSingleApiExeUrl,
                requestBody,
                config
            ).then(res => {
                this.setResponse(JSON.stringify(res.data))
            }).catch((e) => console.error(e));
        } else {
            console.log("Invalid url: " + this.state.url);
        }
    }

    render() {
        return (
            <div>
                <div id="input">
                    <label>
                        URL:
                         <input type="url" value={this.state.url} onChange={e => this.setUrl(e.target.value)} required />
                        <input type="button" value="Send" onClick={this.sendRequest} />
                    </label>
                </div>
                <div id="output">
                    <textarea id="apiOutput" value={this.state.response} />
                </div>
            </div>
        );
    }
}

function isValidUrl(s: string): boolean {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(s);
}

function getNormalizedUrl(s: string): string {
    return s.search("http") === -1 ? "http://" + s : s;
}

export default RequestParentComponent;
const backendServiceSingleApiExeUrl = "http://localhost:8110/api";