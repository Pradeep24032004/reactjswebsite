import "antd/dist/antd";
import "./App.css";
import React from "react";
import { Calendar } from 'antd';
import {Menu, Dropdown} from 'antd';
//import React, { useState } from 'react';
//import moment from 'moment';
import { Button, Table, Modal ,Input} from "antd";
//import {Tag} from 'antd';
import {useState} from "react";
import {Select} from "antd"
import {EditOutlined,DeleteOutlined,SearchOutlined} from '@ant-design/icons'
function App() {
  //const {Option} = Select;
  //const [date, setDate] = useState(null);
  //const STATUS_RANGE = [{label:'open',value:'open'},{label:'working',value:'working'}];
  
  const [isEditing, setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [dataSource, setDataSource] = useState(
    [
      {
        id:'1',
        sdate:'2023-04-04',
        name:'hello',
        email:'hello@gmail.com',
        address: '2023-04-15',
        status:'open',
        tags:'#insta'
      }
    ]
  )
  const columns = [
    {
       key:'1',
       title:'ID',
       dataIndex:'id',
    },
    {
      key:'2',
      title:'Start date',
      dataIndex:'sdate',
      render:(text,record) =>{
       const date = new Date(text);
       const formattedDate = date.toLocaleDateString('en-US');
       return formattedDate;
     },
     filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters})=>{
      return(
        <>
         <input 
            autoFocus 
            placeholder="type text here" 
            value = {selectedKeys[0]}
            onChange={(e)=>{
                setSelectedKeys(e.target.value?[e.target.value]:[]);
            }}
            onPressEnter={()=>{
                confirm();
            }}
            onBlur={() => {
                confirm();
            }}
          ></input>;
          <Button 
            onClick={()=>{
              confirm();
            }}
            type = "primary"
          >Search</Button>
          <Button 
            onClick={()=>{
              clearFilters();
            }}
            type = "danger"
          >Reset</Button>
        </>
      );
    },
    filterIcon: ()=>{
     return <SearchOutlined/>;
    },
    onFilter: (value, record)=>{
      return record.name.toLowerCase().includes(value.toLowerCase())
    },
      
   },
    {
      key:'3',
      title:'Title',
      dataIndex:'name',
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters})=>{
        return(
          <>
           <input 
              autoFocus 
              placeholder="type text here" 
              value = {selectedKeys[0]}
              onChange={(e)=>{
                  setSelectedKeys(e.target.value?[e.target.value]:[]);
              }}
              onPressEnter={()=>{
                  confirm();
              }}
              onBlur={() => {
                  confirm();
              }}
            ></input>;
            <Button 
              onClick={()=>{
                confirm();
              }}
              type = "primary"
            >Search</Button>
            <Button 
              onClick={()=>{
                clearFilters();
              }}
              type = "danger"
            >Reset</Button>
          </>
        );
      },
      filterIcon: ()=>{
       return <SearchOutlined/>;
      },
      onFilter: (value, record)=>{
        return record.name.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      key:'4',
      title:'Description',
      dataIndex:'email',
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters})=>{
        return(
          <>
           <input 
              autoFocus 
              placeholder="type text here" 
              value = {selectedKeys[0]}
              onChange={(e)=>{
                  setSelectedKeys(e.target.value?[e.target.value]:[]);
              }}
              onPressEnter={()=>{
                  confirm();
              }}
              onBlur={() => {
                  confirm();
              }}
            ></input>;
            <Button 
              onClick={()=>{
                confirm();
              }}
              type = "primary"
            >Search</Button>
            <Button 
              onClick={()=>{
                clearFilters();
              }}
              type = "danger"
            >Reset</Button>
          </>
        );
      },
      filterIcon: ()=>{
       return <SearchOutlined/>;
      },
      onFilter: (value, record)=>{
        return record.email.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      key:'5',
      title:'Due Date',
      dataIndex:'address',
      render:(text,record) =>{
       const date = new Date(text);
        const formattedDate = date.toLocaleDateString('en-US');
        return formattedDate;
      },//sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      //render: date => moment(date).format('YYYY-MM-DD'),
  
    },
    {
      key:'6',
      title:'Status',
      dataIndex:'status',  
    },
    {
      key:'7',
      title:'Tags',
      dataIndex:'tags',
    },
    
    {
      key:"8",
      title:'Actions',
      render:(record)=>{
        return <>
          <EditOutlined onClick={()=>{
             onEditStudent(record)
          }}/>
          <DeleteOutlined onClick={()=>{
             onDeleteStudent(record)
          }}
             style = {{ color: 'red', marginLeft:12 } }/>
        </>
      }
    },


  ];
  const onAddStudent = ()=>{
    const randomNumber = parseInt(Math.random()*1000);
    const newStudent = {
       id: randomNumber,
       sdate:"Start date" + randomNumber,
       name: "Event" + randomNumber,
       email: randomNumber+"Description",
       address:"Due date" + randomNumber,
       
    };
    setDataSource(pre=>{
      return[...pre,newStudent]
    });
  };
  const onDeleteStudent = (record)=>{
    Modal.confirm({
      title:'are you sure, you want to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      onOk:() =>{
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      }
    })
  };
  const onEditStudent = (record) =>{
    setIsEditing(true);
    setEditingStudent({...record})
  };
  const resetEditing = () =>{
    setIsEditing(false);
    setEditingStudent(null);
  };
  
  const fruits = ['Open','Work','Gover']
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onAddStudent}>Add new Title</button>
        <Table
          columns = {columns}
          dataSource = {dataSource}
         >
        </Table>
        <Modal
          title="Edit Student"
          visible = {isEditing}
          okText = "Save"
          onCancel={() =>{
            resetEditing()
          }}
          onOk = {()=>{
             setDataSource(pre=>{
               return pre.map(student=>{
                 if(student.id === editingStudent.id){
                   return editingStudent
                 }else{
                   return student
                 }
               })
             })
             resetEditing()
          }}
        >    
             <input value={editingStudent?.sdate} onChange={(e)=>{
             setEditingStudent(pre=>{
               return {...pre, sdate:e.target.value}
             })
           }}/>
             
           <input value={editingStudent?.name} onChange={(e)=>{
             setEditingStudent(pre=>{
               return {...pre, name:e.target.value}
             })
           }}/>
           <input value={editingStudent?.email} onChange={(e)=>{
             setEditingStudent(pre=>{
               return {...pre, email:e.target.value}
             })
           }} />
           <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <h4>ReactJS Ant-Design Calendar Component</h4>
      <Calendar onChange={(value) => {
        alert(`Your selected ${value.format('YYYY-MM-DD')}`)
      }} />
    </div>
           <input value={editingStudent?.address}  onChange={(e)=>{
             setEditingStudent(pre=>{
               //if(student.sdate > value){
                   return {...pre, address:e.target.value}
               //}
             })
           }}/>
          <div style = {{display: 'block',width: 600,padding:30}}>
       
          <>
          <Dropdown
              overlay = {(
                  <Menu>
                    <Menu.Item key = "0" >OPEN</Menu.Item>
                    <Menu.Item key = "1" >WORKING</Menu.Item>
                    <Menu.Item key = "2">DONE</Menu.Item>
                    <Menu.Item key = "3">OVERDUE</Menu.Item>
                  </Menu>
              )}
              trigger = {['click']}>
               <a   className="ant-dropdown-link" onClick={e => e.preventDefault()}
                
             >Status</a>
          </Dropdown>
          </>
          </div>
          <input value={editingStudent?.status}  onChange={(e)=>{
             setEditingStudent(pre=>{
               //if(student.sdate > value){
                   return {...pre, status:e.target.value}
               //}
             })
           }}/>
          <input value={editingStudent?.tags}  onChange={(e)=>{
             setEditingStudent(pre=>{
               //if(student.sdate > value){
                   return {...pre, tags:e.target.value}
               //}
             })
           }}/>
        </Modal>
      </header>
    </div>
  );
}

export default App;
