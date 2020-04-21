import React, { Component } from 'react';
import '../App.css';
import { Col, Row, Jumbotron } from 'react-bootstrap';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left1: '15%',
            mid1: '55%',
            right1: '30%',
            left2: '35%',
            mid2: '40%',
            right2: '25%'
        };
    }

    render() {
        return (
            <div>
                <Col style={{ margin: 20 }}>
                    <Row style={{ left: 'calc( 50% - 60px )', position: 'relative' }}>
                        <h3>Enter Keyword</h3>
                    </Row>
                    <Row style={{ left: 'calc( 50% - 60px )', position: 'relative' }}>
                        <input></input>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <Jumbotron className='leftbox'>
                                <h4>ตัวอย่างทวีตที่ได้รับความนิยม</h4>
                                <hr />
                                <br />
                                <h5>เรียงตาม ... </h5>
                            </Jumbotron>
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
                        <Col>
                            <Row style={{ marginRight: '20px', marginTop: '75px' }}>
                                <p style={{ width: this.state.left1,whiteSpace:'nowrap',textAlign: 'center' }}>เห็นด้วยกับรัฐบาล {this.state.left1}</p>
                                <p style={{ width: this.state.mid1 ,textAlign: 'center'}}>เป็นกลางหรือไม่เกี่ยวข้อง</p>
                                <p style={{ width: this.state.right1,textAlign: 'center' }}>ไม่เห็นด้วยกับรัฐบาล {this.state.right1}</p>
                            </Row>
                            <Row style={{ marginRight: '20px'}}>
                                <p className="leftgreen" style={{ width: this.state.left1}}></p>
                                <p className="midgrey" style={{ width: this.state.mid1 }}></p>
                                <p className="rightred" style={{ width: this.state.right1 }}></p>
                            </Row>
                            <Row style={{ marginRight: '20px', marginTop: '130px' }}>
                                <p className="leftgreen" style={{ width: this.state.left2 }}>เห็นด้วยกับฝ่ายค้าน {this.state.left1}</p>
                                <p className="midgrey" style={{ width: this.state.mid2 }}>เป็นกลางหรือไม่เกี่ยวข้อง</p>
                                <p className="rightred" style={{ width: this.state.right2 }}>ไม่เห็นด้วยกับฝ่ายค้าน {this.state.right2}</p>
                            </Row>
                            <h4>wordcloud</h4>
                        </Col>
                    </Row>

                </Col>
            </div>
        )
    }
}

export default MainPage;
