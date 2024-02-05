import React, { useEffect, useState } from 'react';
import SelectPackage from './SelectPackage';
import SelectOffice from './SelectOffice';
import axios from 'axios';
import './Main.css'
import dayjs from 'dayjs';
import SelectDevice from './SelectDevice';

const Main = () => {
  const [viewInfo, setViewInfo] = useState(false)
  const [page, setPage] = useState(1)
  const [element, setElement] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [size, setSize] = useState(10)
  const [keyword, setKeyword] = useState('')
  const [memo, setMeomo] = useState('')
  const [deviceList, setDeviceList] = useState([])
  const [selectPackage, setSelectPackage] = useState({name: '', id: 0})
  const [selectOffice, setSelectOffice] = useState({name: '', id: 0})
  const [campaignInfo, setCampaignInfo] = useState({
    description : '',
    devices : [],
    endDate : dayjs().add(6, 'day').endOf('day').toISOString(),
    endTime : -1,
    extra : "{\"expandedKeys\": [], \"treeValue\": null, \"category\": \"\"}",
    firmwarePackageID : 0,
    name : '',
    startDate : dayjs().toISOString(),
    startTime : -1,
    typeProtocol : "HTTP",
    typeTarget : "SELECTION",
    typeUpdate : "REG_UPDATE"
  })
  
//  console.log(campaignInfo)
  var token = ''
  const account = {userid : "youngit1", password : "eW91bmdpdDA3MDc="}

  const package_select_url = 'https://api-kt.neoidm.com:8989/api/fota/package/?isActive=true&sortColNm=&sortAsc=&page=0&size=10'
  const create_campaign_url = 'https://api-kt.neoidm.com:8989/api/fota/campaign/'
  const device_list_url = `https://api-kt.neoidm.com:8989/api/hycheck/device/?organizationId=${selectOffice.id}&stage=REGISTERED&stage=INSTOCK&stage=RELEASED&stage=RETURNED&stage=REPAIR&stage=DISPOSAL&sort=timecreated,asc`
  const device_list_url_with_keyword = `https://api-kt.neoidm.com:8989/api/hycheck/device/?organizationId=${selectOffice.id}&optId=true&optDeviceSerial=true&optFirmwareVersion=true&keyword=${keyword}&stage=REGISTERED&stage=INSTOCK&stage=RELEASED&stage=RETURNED&stage=REPAIR&stage=DISPOSAL&sort=timecreated,asc`

  const packageList = [
    {name : '101_101to900', id : 166047907,},
    {name : '101_102to900', id : 173675938},
    {name : '101_103to900', id : 178027822},
    {name : '101_104to900', id : 203217990},
    {name : '101_105to900', id : 156436301},
    {name : '100_100to900', id : 240481359},
    {name : '100_102to900', id : 240481359},
    {name : '150to900', id : 276429232},
    {name : '151to900', id : 276429336},
  ]

  const officeList = [
    {name: '세종', id: 59833163},
    {name: '순천', id: 1180878},
    {name: '화순', id: 135028},
  ]

  const getToken = async () => {
    await axios.post('https://api-kt.neoidm.com:8989/api/login/', account)
    .then((res) => {
      if(res.status = 200) {
        token = res.data.token
        console.log('토큰 발급 완료')
      }
      else {
        console.log('토큰 발급 실패')
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const getPageNumber = async (id, device_size) => {
    await getToken()
    await axios.get(`https://api-kt.neoidm.com:8989/api/hycheck/device/?organizationId=${id}&stage=REGISTERED&stage=INSTOCK&stage=RELEASED&stage=RETURNED&stage=REPAIR&stage=DISPOSAL&sort=timecreated,asc&page=${page-1}&size=${device_size}`, {
      headers: {
        Authorization : "Bearer" + token
      }
    })
    .then((res) => {
      console.log(res)
      if(res.data.content.length > 0) {
        setElement(res.data.totalElements)
        setMaxPage(res.data.totalPages)
      }
    })
  }

  const selectDevice = async (id, device_size, keyword, device_page) => {
    console.log('검색어 : ', keyword)
    console.log('사이즈 : ', device_size)
    console.log('페이지 : ', device_page)
    await getToken()
    if(keyword === '') {
      await axios.get(`https://api-kt.neoidm.com:8989/api/hycheck/device/?organizationId=${id}&stage=REGISTERED&stage=INSTOCK&stage=RELEASED&stage=RETURNED&stage=REPAIR&stage=DISPOSAL&sort=timecreated,asc&page=${device_page-1}&size=${device_size}`, {
        headers: {
          Authorization : "Bearer" + token
        }
      })
      .then((res) => {
        if(res.data.content.length > 0) {
          const data = res.data.content
          const select_imei = data.map((el) => el.imei)
          setDeviceList(data)
          setCampaignInfo({...campaignInfo, devices: select_imei})
          setElement(res.data.totalElements)
          setMaxPage(res.data.totalPages)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      await axios.get(`https://api-kt.neoidm.com:8989/api/hycheck/device/?organizationId=${id}&optId=true&optDeviceSerial=true&optFirmwareVersion=true&keyword=${keyword}&stage=REGISTERED&stage=INSTOCK&stage=RELEASED&stage=RETURNED&stage=REPAIR&stage=DISPOSAL&sort=timecreated,asc&page=${device_page-1}&size=${device_size}`, {
        headers: {
          Authorization : "Bearer" + token
        }
      })
      .then((res) => {
        if(res.data.content.length > 0) {
          const data = res.data.content
          const select_imei = data.map((el) => el.imei)
          setDeviceList(data)
          setCampaignInfo({...campaignInfo, devices: select_imei})
          setElement(res.data.totalElements)
          setMaxPage(res.data.totalPages)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    
  }

  const createCampaign = async () => {
    await getToken()
    await axios.post('https://api-kt.neoidm.com:8989/api/fota/campaign/', campaignInfo, {
      headers: {
        Authorization : "Bearer" + token
      }
    })
    .then((res) => {
      console.log('캠페인 생성 완료')
      setCampaignInfo({...campaignInfo,
      devices: [],
      name: '',
      firmwarePackageID: 0,
      description: ''
    })
    })
    .catch((err) => {
      console.log(err)
    })
  }

console.log(deviceList)
  return (
    <div
      className='background'
      style={{
        position:'relative',
        width:'100vw',
        height:'100vh'
      }}
    >
      <div className='header' style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:'20px'}}>
        <div style={{color:'white', fontSize:'50px', fontWeight:'bold', textAlign:'center', height:'150px'}}>
          HYCHECK-FOTA-SERVICE
        </div>
      </div>
      
      <div
        style={{
          display:'flex',
          flexDirection:'column',
          position:'relative',
          justifyContent:'center',
          alignItems:'center', 
          color:'white',        
        }}
      >
        <div className='inputBox mb-5'>
          <input
            type="text"
            placeholder='캠페인 이름을 입력하세요.'
            onChange={(e) => {setCampaignInfo({...campaignInfo, name: e.target.value})}}
          />
        </div>

        <div className='gap-3 mb-3' style={{display:'flex', justifyContent:'space-between', alignItems:'center', height:'auto'}}>
          <div
            style={{
              textAlign:'center',
              fontSize:'18px',
              borderBottom:'1px solid',
              paddingLeft:'10px',
              paddingRight:'10px'
            }}
          >
            <div>
              {selectOffice.name=== '' ? (
                <div style={{color:'#9e9e9e'}}>
                  사업소를 선택하세요.
                </div>
                
              ) : (
                <div>
                  {selectOffice.name}
                </div>
                
              )}
            </div>
          </div>
          <div
            style={{
              border:'2px',
              borderStyle:'solid',
              borderColor:'white',
              borderRadius:'10px',
              cursor:'pointer'
            }}
            onClick={() => {setSelectOffice({name: '', id: 0})}}
            data-bs-toggle='modal'
            data-bs-target='#officeSelectModal'
          >
            <div style={{padding:'10px'}}>
              사업소 선택
            </div>
          </div>
        </div>

        {selectOffice.name !== '' ? (
          <>
          {/* <div className='mb-3'>
            --------------------------------------------------------------------
            <div className='fw-bold text-center'>
              [ {selectOffice.name} 사업소 정보 ]
              <br />
              * 총 단말기 수 : {element}
            </div>
            --------------------------------------------------------------------
          </div> */}
          <div className='gap-3 mb-5' style={{display:'flex', justifyContent:'space-between', alignItems:'center', height:'auto'}}>
          <div
            style={{
              textAlign:'center',
              fontSize:'18px',
              borderBottom:'1px solid',
              paddingLeft:'10px',
              paddingRight:'10px'
            }}
          >
            <div>
              {selectOffice.name=== '' ? (
                <div style={{color:'#9e9e9e'}}>
                  단말기 선택하세요.
                </div>
                
              ) : (
                <div>
                  {deviceList.length > 0 ? (
                    <div>
                      {deviceList.length} 대
                    </div>
                  ) : (
                    <div>
                      0 대
                    </div>
                  )}
                </div>
                
              )}
            </div>
          </div>
          <div
            style={{
              border:'2px',
              borderStyle:'solid',
              borderColor:'white',
              borderRadius:'10px',
              cursor:'pointer'
            }}
            onClick={() => {
              setSize(10)
              setKeyword('')
              setDeviceList([])
              setCampaignInfo({...campaignInfo, devices: []})
            }}
            data-bs-toggle='modal'
            data-bs-target='#deviceSelectModal'
          >
            <div style={{padding:'10px'}}>
              단말기 선택
            </div>
          </div>

        </div>
          </>
        ) : (
          <></>
        )}

        

        <div className='gap-3' style={{display:'flex', justifyContent:'space-between', alignItems:'center', height:'auto'}}>
          <div
            style={{
              textAlign:'center',
              fontSize:'18px',
              borderBottom:'1px solid',
              paddingLeft:'10px',
              paddingRight:'10px'
            }}
          >
            <div>
              {selectPackage.name=== '' ? (
                <div style={{color:'#9e9e9e'}}>
                  패키지를 선택하세요.
                </div>
                
              ) : (
                <div>
                  {selectPackage.name}
                </div>
                
              )}
            </div>
          </div>
          <div
            style={{
              border:'2px',
              borderStyle:'solid',
              borderColor:'white',
              borderRadius:'10px',
              cursor:'pointer'
            }}
            onClick={() => {setCampaignInfo({...campaignInfo, firmwarePackageID: 0})}}
            data-bs-toggle='modal'
            data-bs-target='#packageSelectModal'
          >
            <div style={{padding:'10px'}}>
              패키지 선택
            </div>
          </div>

        </div>

        <div className='d-flex mt-5'>
        <button
          // className={'bg-secondary'}
          style={{borderRadius:'10px', border:'none', backgroundColor:'rgb(70, 100, 255)', color:'white', padding:'8px'}}
          disabled={campaignInfo.firmwarePackageID === 0}
          onClick={() => {
            createCampaign()
          }}
        >
          캠페인 생성
        </button>
      </div>
        
        {viewInfo === true ? (
          <div className='text-center d-felx mt-5'>
            <div className='fs-4 fw-bold'>[ 선택 단말기 리스트 ]</div>
            <table className='mt-4' style={{width:'800px', height:'200px', overflow:'auto'}}>
              <thead className='fs-4'>
                <tr>
                  <th>No</th>
                  <th className=''>IMEI</th>
                  <th className=''>Firmware</th>
                  <th className=''>S/N</th>
                  <th className=''>iccid</th>
                </tr>
              </thead>
              <tbody className='fs-5'>
                {deviceList.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {i}
                      </td>
                      <td>
                        {el.imei}
                      </td>
                      <td>
                        {el.deviceFirmwareVersion}
                      </td>
                      <td>
                        {el.deviceSerialNumber}
                      </td>
                      <td>
                        {el.iccid}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
        
      </div>

      
      
      <SelectPackage
        packageList={packageList}
        setSelectPackage={setSelectPackage}
        selectPackage={selectPackage}
        setCampaignInfo={setCampaignInfo}
        campaignInfo={campaignInfo} />
      <SelectOffice
        officeList={officeList}
        setSelectOffice={setSelectOffice}
        selectOffice={selectOffice}
        getPageNumber={getPageNumber} />
      <SelectDevice
        selectDevice={selectDevice}
        setKeyword={setKeyword}
        setSize={setSize}
        maxPage={maxPage}
        setPage={setPage}
        selectOffice={selectOffice}
        size={size}
        keyword={keyword}
        page={page}
        element={element}
        setViewInfo={setViewInfo}
      />
    </div>
  );
};

export default Main;