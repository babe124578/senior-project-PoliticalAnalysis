import React, { Component } from 'react';
import '../App.css';
import { Col, Row, Button, InputGroup, FormControl, Toast, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactWordcloud from 'react-wordcloud';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left1: '33%',
            mid1: '33%',
            right1: '33%',
            left2: '35%',
            mid2: '40%',
            right2: '25%',
            keyword: '',
            populars: [{ "sum": 0, "text": "No data" }],
            agendas: [{ "sum": 0, "text": "No data" }],
            news: [{ "sum": 0, "text": "No data" }],
            wordcloudData: [{ "sum": 1, "text": "No data" }],
            topClick: false,
            midClick: false,
            botClick: false
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

    submitButton = (e) => {
        if (this.state.keyword !== "") {
            fetch('http://localhost:5000/tweetExample?keyword=' + this.state.keyword)
                .then(res => res.json())
                .then((data) => {
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
                    if (data.wordcloud.length === 0) {
                        this.setState({ wordcloudData: [{ "text": "Tweet not found", "value": 15 }] })
                    } else {
                        this.setState({ wordcloudData: data.wordcloud })
                    }
                })
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
                    <Col className="threeColorBar" style={{ margin: 15 }}>
                        <Row style={{ marginRight: '20px' }}>
                            <p style={{ width: this.state.left1, whiteSpace: 'nowrap', textAlign: 'center' }}>เห็นด้วยกับรัฐบาล</p>
                            <p style={{ width: this.state.mid1, whiteSpace: 'nowrap', textAlign: 'center' }}>เป็นกลางหรือไม่เกี่ยวข้อง</p>
                            <p style={{ width: this.state.right1, whiteSpace: 'nowrap', textAlign: 'center' }}>ไม่เห็นด้วยกับรัฐบาล</p>
                        </Row>
                        <Row style={{ marginRight: '20px' }}>
                            <p className="leftgreen" style={{ width: this.state.left1 }}>{this.state.left1}</p>
                            <p className="midgrey" style={{ width: this.state.mid1 }}>{this.state.mid1}</p>
                            <p className="rightred" style={{ width: this.state.right1 }}>{this.state.right1}</p>
                        </Row>
                        <Row style={{ marginRight: '20px', marginTop: '30px' }}>
                            <p style={{ width: this.state.left2, whiteSpace: 'nowrap', textAlign: 'center' }}>เห็นด้วยกับฝ่ายค้าน</p>
                            <p style={{ width: this.state.mid2, whiteSpace: 'nowrap', textAlign: 'center' }}>เป็นกลางหรือไม่เกี่ยวข้อง</p>
                            <p style={{ width: this.state.right2, whiteSpace: 'nowrap', textAlign: 'center' }}>ไม่เห็นด้วยกับฝ่ายค้าน</p>
                        </Row>
                        <Row style={{ marginRight: '20px' }}>
                            <p className="leftgreen" style={{ width: this.state.left2 }}>{this.state.left2}</p>
                            <p className="midgrey" style={{ width: this.state.mid2 }}>{this.state.mid2}</p>
                            <p className="rightred" style={{ width: this.state.right2 }}>{this.state.right2}</p>
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
