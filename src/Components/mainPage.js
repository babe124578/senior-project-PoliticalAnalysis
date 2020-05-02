import React, { Component } from 'react';
import '../App.css';
import { Col, Row, Button, InputGroup, FormControl, Toast, OverlayTrigger, Tooltip, ProgressBar } from 'react-bootstrap';
import ReactWordcloud from 'react-wordcloud';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agreeGovPercent: 0,
            disAgreeGovPercent: 0,
            agreeOpPercent: 0,
            disAgreeOpPercent: 0,
            keyword: '',
            populars: [{ "sum": 0, "text": "No data" }],
            agendas: [{ "sum": 0, "text": "No data" }],
            news: [{ "sum": 0, "text": "No data" }],
            agreeGov: [],
            agreeOp: [],
            disAgreeGov: [],
            disAgreeOp: [],
            wordcloudData: [{ "sum": 1, "text": "No data" }],
            topClick: false,
            midClick: false,
            botClick: false,
            aGov:'',
            disGov: '',
            aOp:'',
            disOp:''
        };
    }

    handleChange = (e) => {
        this.setState({ keyword: e.target.value })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.submitButton(e)
        }
    }

    handleClickTop = (e) => {
        this.setState({ topClick: !this.state.topClick })
    }
    handleClickMid = (e) => {
        this.setState({ midClick: !this.state.midClick })
    }
    handleClickBot = (e) => {
        this.setState({ botClick: !this.state.botClick })
    }

    updateData = (data) => {
        if (data.popular.length === 0) {
            this.setState({ populars: [{ "sum": 0, "text": "Tweet not found" }] })
        } else {
            this.setState({ populars: data.popular })
        }
        if (data.agenda.length === 0) {
            this.setState({ agendas: [{ "sum": 0, "text": "Tweet not found" }] })
        } else {
            this.setState({ agendas: data.agenda })
        }
        if (data.new.length === 0) {
            this.setState({ news: [{ "sum": 0, "text": "Tweet not found" }] })
        } else {
            this.setState({ news: data.new })
        }
        this.setState({
            agreeGov: data.agreeGov,
            agreeOp: data.agreeOp,
            disAgreeGov: data.disAgreeGov,
            disAgreeOp: data.disAgreeOp
        })

        if (data.wordcloud.length === 0) {
            this.setState({ wordcloudData: [{ "text": "Tweet not found", "value": 15 }] })
        } else {
            this.setState({ wordcloudData: data.wordcloud })
        }
    }
    submitButton = (e) => {
        if (this.state.keyword !== "") {
            fetch('http://localhost:5000/tweetExample?keyword=' + this.state.keyword)
                .then(res => res.json())
                .then((data) => {
                    this.updateData(data)
                })
                .then(
                    (async () => {
                        var len = this.state.populars.length
                        try {
                            var agov = this.state.agreeGov[Math.floor(Math.random() * this.state.agreeGov.length)].text
                        } catch (e) {}
                        try {
                            var disgov = this.state.disAgreeGov[Math.floor(Math.random() * this.state.disAgreeGov.length)].text
                        } catch (e) {}
                        try {
                            var aop = this.state.agreeOp[Math.floor(Math.random() * this.state.agreeOp.length)].text
                        } catch (e) {}
                        try {
                            var disop = this.state.disAgreeOp[Math.floor(Math.random() * this.state.disAgreeOp.length)].text
                        } catch (e) {}
                        this.setState(await {
                            agreeGovPercent: (this.state.agreeGov.length / len),
                            disAgreeGovPercent: (this.state.disAgreeGov.length / len),
                            agreeOpPercent: (this.state.agreeOp.length / len),
                            disAgreeOpPercent: (this.state.disAgreeOp.length / len),
                            aGov: await agov,
                            disGov: await disgov,
                            aOp: await aop,
                            disOp: await disop
                        })
                    })
                )
        }
    }

    render() {
        let { populars, agendas, news } = this.state
        return (
            <div>
                <div className="headers" style={{ paddingTop: 15 }}>
                    <Row>
                        <h3 className="headerText">Enter Keyword</h3>
                    </Row>
                    <Row>
                        <InputGroup className="inputgroup">
                            <FormControl
                                placeholder="Keyword"
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="dark"
                                    onClick={this.submitButton}
                                >Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </div>
                <Row className="content">
                    <Col style={{ marginLeft: 15 }}>
                        <OverlayTrigger
                            overlay={<Tooltip>{this.state.topClick === false ? "Click here to see more" : "Click here to se less"}</Tooltip>}
                        >
                            <Toast onClick={this.handleClickTop} style={{ maxWidth: '100%' }}>
                                <Toast.Header
                                    closeButton={false}
                                    id="headertoast"
                                >
                                    <strong className="mr-auto" id="popular">ตัวอย่างทวิตที่ได้รับความนิยม</strong>
                                    <small id="popularity">ความนิยม</small>
                                </Toast.Header>
                                {this.state.topClick === false ? populars.slice(0, 3).map(function (m, idx) {
                                    return (
                                        <Toast.Header closeButton={false} key={idx}>
                                            <strong className="mr-auto">{m.text}</strong>
                                            <small style={{ marginLeft: 5 }}>{m.sum}</small>
                                        </Toast.Header>
                                    )
                                })
                                    :
                                    populars.map(function (m, idx) {
                                        return (
                                            <Toast.Header closeButton={false} key={idx}>
                                                <strong className="mr-auto">{m.text}</strong>
                                                <small style={{ marginLeft: 5 }}>{m.sum}</small>
                                            </Toast.Header>
                                        )
                                    })}
                            </Toast>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={<Tooltip>{this.state.midClick === false ? "Click here to see more" : "Click here to se less"}</Tooltip>}
                        >
                            <Toast onClick={this.handleClickMid} style={{ maxWidth: '100%' }}>
                                <Toast.Header
                                    closeButton={false}
                                    id="headertoast"
                                >
                                    <strong className="mr-auto" id="popular">ตัวอย่างทวีตที่มี Agenda</strong>
                                    <small id="popularity">ความนิยม</small>
                                </Toast.Header>
                                {this.state.midClick === false ? agendas.slice(0, 3).map(function (m, idx) {
                                    return (
                                        <Toast.Header closeButton={false} key={idx}>
                                            <strong className="mr-auto">{m.text}</strong>
                                            <small style={{ marginLeft: 5 }}>{m.sum}</small>
                                        </Toast.Header>
                                    )
                                })
                                    :
                                    agendas.map(function (m, idx) {
                                        return (
                                            <Toast.Header closeButton={false} key={idx}>
                                                <strong className="mr-auto">{m.text}</strong>
                                                <small style={{ marginLeft: 5 }}>{m.sum}</small>
                                            </Toast.Header>
                                        )
                                    })}
                            </Toast>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={<Tooltip>{this.state.botClick === false ? "Click here to see more" : "Click here to se less"}</Tooltip>}
                        >
                            <Toast onClick={this.handleClickBot} style={{ maxWidth: '100%' }}>
                                <Toast.Header
                                    closeButton={false}
                                    id="headertoast"
                                >
                                    <strong className="mr-auto" id="popular">ตัวอย่างทวีตที่เป็นข่าว</strong>
                                    <small id="popularity">ความนิยม</small>
                                </Toast.Header>
                                {this.state.botClick === false ? news.slice(0, 3).map(function (m, idx) {
                                    return (
                                        <Toast.Header closeButton={false} key={idx}>
                                            <strong className="mr-auto">{m.text}</strong>
                                            <small style={{ marginLeft: 5 }}>{m.sum}</small>
                                        </Toast.Header>
                                    )
                                })
                                    :
                                    news.map(function (m, idx) {
                                        return (
                                            <Toast.Header closeButton={false} key={idx}>
                                                <strong className="mr-auto">{m.text}</strong>
                                                <small style={{ marginLeft: 5 }}>{m.sum}</small>
                                            </Toast.Header>
                                        )
                                    })}
                            </Toast>
                        </OverlayTrigger>
                    </Col>
                    <Col className="threeColorBar">
                        <ProgressBar width="100%" variant="success" now={parseInt((this.state.agreeGovPercent * 100).toFixed(0))} />
                        <p style={{ width: this.state.left1, whiteSpace: 'nowrap' }}>เห็นด้วยกับรัฐบาล{' ' + parseInt((this.state.agreeGovPercent * 100).toFixed(0)) + '%'}</p>
                        <ProgressBar width="100%" variant="danger" now={parseInt((this.state.disAgreeGovPercent * 100).toFixed(0))} />
                        <p style={{ width: this.state.right1, whiteSpace: 'nowrap' }}>ไม่เห็นด้วยกับรัฐบาล{' ' + parseInt((this.state.disAgreeGovPercent * 100).toFixed(0)) + '%'}</p>
                        <Row>
                            <Col>
                                <Toast style={{ maxWidth: '100%' }}>
                                    <Toast.Header
                                        closeButton={false}
                                        id="headertoast"
                                    >
                                        <strong className="mr-auto" id="popular">ตัวอย่างทวีตที่เห็นด้วยกับรัฐบาล</strong>
                                    </Toast.Header>
                                    <Toast.Header closeButton={false}>
                                        {this.state.agreeGov.length > 0
                                            ?
                                            <strong className="mr-auto">{this.state.aGov}</strong>
                                            :
                                            <strong className="mr-auto">tweet not found</strong>
                                        }
                                    </Toast.Header>
                                </Toast>
                            </Col>
                            <Col>
                                <Toast style={{ maxWidth: '100%' }}>
                                    <Toast.Header
                                        closeButton={false}
                                        id="headertoast"
                                    >
                                        <strong className="mr-auto" id="popular">ตัวอย่างทวีตที่ไม่เห็นด้วยกับรัฐบาล</strong>
                                    </Toast.Header>
                                    <Toast.Header closeButton={false}>
                                        {this.state.disAgreeGov.length > 0
                                            ?
                                            <strong className="mr-auto">{this.state.disGov}</strong>
                                            :
                                            <strong className="mr-auto">tweet not found</strong>
                                        }
                                    </Toast.Header>
                                </Toast>
                            </Col>
                        </Row>
                        <hr />
                        <ProgressBar width="100%" variant="success" now={parseInt((this.state.agreeOpPercent * 100).toFixed(0))} />
                        <p style={{ width: this.state.left2, whiteSpace: 'nowrap' }}>เห็นด้วยกับฝ่ายค้าน{' ' + parseInt((this.state.agreeOpPercent * 100).toFixed(0)) + '%'}</p>
                        <ProgressBar width="100%" variant="danger" now={parseInt((this.state.disAgreeOpPercent * 100).toFixed(0))} />
                        <p style={{ width: this.state.right2, whiteSpace: 'nowrap' }}>ไม่เห็นด้วยกับฝ่ายค้าน{' ' + parseInt((this.state.disAgreeOpPercent * 100).toFixed(0)) + '%'}</p>
                        <Row>
                            <Col>
                                <Toast style={{ maxWidth: '100%' }}>
                                    <Toast.Header
                                        closeButton={false}
                                        id="headertoast"
                                    >
                                        <strong className="mr-auto" id="popular">ตัวอย่างทวีตที่เห็นด้วยกับฝ่ายค้าน</strong>
                                    </Toast.Header>
                                    <Toast.Header closeButton={false}>
                                        {this.state.agreeOp.length > 0
                                            ?
                                            <strong className="mr-auto">{this.state.aOp}</strong>
                                            :
                                            <strong className="mr-auto">tweet not found</strong>
                                        }
                                    </Toast.Header>
                                </Toast>
                            </Col>
                            <Col>
                                <Toast style={{ maxWidth: '100%' }}>
                                    <Toast.Header
                                        closeButton={false}
                                        id="headertoast"
                                    >
                                        <strong className="mr-auto" id="popular">ตัวอย่างทวีตที่ไม่เห็นด้วยกับฝ่ายค้าน</strong>
                                    </Toast.Header>
                                    <Toast.Header closeButton={false}>
                                        {this.state.disAgreeOp.length > 0
                                            ?
                                            <strong className="mr-auto">{this.state.disOp}</strong>
                                            :
                                            <strong className="mr-auto">tweet not found</strong>
                                        }
                                    </Toast.Header>
                                </Toast>
                            </Col>
                        </Row>
                        <Row>
                            <ReactWordcloud
                                words={this.state.wordcloudData}
                                options={{
                                    enableTooltip: false,
                                    deterministic: false,
                                    fontFamily: 'Sriracha',
                                    fontSizes: [10, 50],
                                    fontStyle: 'normal',
                                    fontWeight: 'normal',
                                    padding: 1,
                                    rotations: 1,
                                    rotationAngles: [0, 90],
                                    scale: 'sqrt',
                                    spiral: 'archimedean',
                                    transitionDuration: 0,
                                }}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MainPage;
