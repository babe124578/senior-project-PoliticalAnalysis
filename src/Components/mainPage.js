import React, { Component } from 'react';
import '../App.css';
import { Col, Row, Jumbotron, Button, InputGroup, FormControl, Toast } from 'react-bootstrap';
import ReactWordcloud from 'react-wordcloud';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left1: '15%',
            mid1: '55%',
            right1: '30%',
            left2: '35%',
            mid2: '40%',
            right2: '25%',
            keyword: '',
            datas: [],
            wordcloudData: []
        };
    }

    handleChange = (e) => {
        this.setState({ keyword: e.target.value })
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.submitButton(e)
        }
    }

    submitButton = (e) => {
        if (this.state.data !== "") {
            fetch('http://localhost:5000/popular?keyword=' + this.state.keyword)
                .then(res => res.json())
                .then((data) => {
                    if (data.popular.length === 0) {
                        this.setState({ datas: [{ "favC": 0, "text": "Tweet not found" }] })
                    } else {
                        this.setState({ datas: data.popular })
                    }
                })
            fetch('http://localhost:5000/wordcloud?keyword=' + this.state.keyword)
                .then(res => res.json())
                .then((data) => {
                    if (data.wordcloud.length === 0) {
                        this.setState({ wordcloudData: [{ "text": "Tweet not found", "value": 15 }] })
                    } else {
                        this.setState({ wordcloudData: data.wordcloud })
                    }
                })
        }
        console.log(this.state.keyword)
        console.log(this.state.datas)
    }

    render() {
        return (
            <div>
                <Col style={{ margin: 20 }}>
                    <Row className='justify-content-md-center'>
                        <h3>Enter Keyword</h3>
                    </Row>
                    <Row className='justify-content-md-center'>
                        <InputGroup className="inputgroup">
                            <FormControl
                                placeholder="Keyword"
                                onChange={this.handleChange}
                                onKeyDown={this.handleKeyDown}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-primary"
                                    onClick={this.submitButton}
                                >Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <Toast style={{ maxWidth: '100%' }}>
                                <Toast.Header
                                    closeButton={false}
                                    id="headertoast"
                                >
                                    <strong className="mr-auto" id="popular">ตัวอย่างทวิตที่ได้รับความนิยม</strong>
                                    <small id="popularity">ความนิยม</small>
                                </Toast.Header>
                                {this.state.datas.map(function (m, idx) {
                                    return (
                                        <Toast.Header closeButton={false} key={idx}>
                                            <strong className="mr-auto">{m.text}</strong>
                                            <small style={{ marginLeft: 5 }}>{m.favC}</small>
                                        </Toast.Header>
                                    )
                                })}
                            </Toast>
                            <Jumbotron className='leftbox'>
                                <h4>ตัวอย่างทวีตที่มี Agenda</h4>
                                <hr />
                                <br />
                                <h5>เรียงตาม ... </h5>
                            </Jumbotron>

                            <Jumbotron className='leftbox'>
                                <h4>ตัวอย่างทวีตที่เป็นข่าว</h4>
                                <hr />
                                <br />
                                <h5>เรียงตาม ... </h5>
                            </Jumbotron>
                            <h4>LDA</h4>
                        </Col>
                        <Col Col style={{ margin: 20 }}>
                            <Row style={{ marginRight: '20px', marginTop: '25px' }}>
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
                                    size={[500, 500]}
                                    options={{
                                        enableTooltip: true,
                                        deterministic: false,
                                        fontFamily: 'impact',
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
                </Col>
            </div>
        )
    }
}

export default MainPage;
