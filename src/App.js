import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Input, Typography, Tooltip, Button } from 'antd';

const { Header, Sider, Content  } = Layout;
const { TextArea } = Input;
const { Paragraph } = Typography;

function App() {
  const [ friend, setFriend ] = useState('0');
  const [ history, setHistory ] = useState([[], [], []]);
  const [ inputText, setInputText ] = useState('');

	const chatHistoryRef = useRef(null);

  useEffect(() => {
    const historyDiv = chatHistoryRef.current;
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }, [history, friend]);
  
  const chooseFriend = e => {
    setInputText('');
    setFriend(e.key);
  };
  
  const sendMessage = (e) => {
    if (e.type === 'keydown') {
      e.preventDefault();
    }
    if (!inputText || !inputText.trim()) {
      return;
    }
    const existingHistory = history;
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}`;
    existingHistory[friend].push({ message: inputText, time });
    setHistory({...existingHistory});
    setInputText('');
  };

  const friendsList = [
    'Best Friend',
    'Friend',
    'Other Friend'
  ];

  return (
    <Layout>
      <Header className='messenger-header'>
        Simple Messenger
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            onClick={chooseFriend}
            className='friends-menu'
            selectedKeys={[friend]}
            mode='inline'
          >
            {friendsList.map((name, i) => <Menu.Item style={{ fontSize: 20 }} key={i}>{name}</Menu.Item>)}
          </Menu>
        </Sider>
        <Content className='site-layout-background chat'>
          <div ref={chatHistoryRef} className='history'>
            {history[friend].map((data, i) => <div key={i} className='message-row'>
              <div className='message'>
                <Tooltip placement="leftTop" title={data.time}>
                  <Paragraph ellipsis={{ rows: 'auto' }}>{data.message}</Paragraph>
                </Tooltip>
              </div>
            </div>)}
          </div>
          <div className='message-input'>
            <TextArea
              style={{ width: '95%' }}
              autoSize={{ maxRows: 3 }}
              placeholder='Type Here'
              onChange={({ target }) => setInputText(target.value)}
              value={inputText}
              onPressEnter={sendMessage}/>
            <Button onClick={sendMessage} type="primary">Send</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
