import { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

import { useSigningClient } from '../contexts/cosmwasm'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { CW20_DECIMAL } from '../hooks/cosmwasm'

const CreateWork = () => {

  const { 
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client,
    getIsAdmin,
    isAdmin,

    getManagerConstants,
    setManagerConstants,
    setManagerAddr,
    setMinStake,
    setRateClient,
    setRateManager,
    managerAddr,
    minStake,
    rateClient,
    rateManager,

    getBalances,
    nativeBalanceStr,
    cw20Balance,
    nativeBalance,

    executeSendContract,
    executeUploadImage

  } = useSigningClient()

  //Work Variables
  const [workTitle, setWorkTitle] = useState('')
  const [workDesc, setWorkDesc] = useState('')
  const [workUrl, setWorkUrl] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [stakeAmount, setStakeAmount] = useState(0)
  const [accountMinStakeAmount, setAccountMinStakeAmount] = useState(0)
  const [clientStakeAmount, setClientStakeAmount] = useState(0)
  const [selectedImage, setSelectedImage] = useState()

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage(null)
  };


  useEffect(()=> {
    setStakeAmount(minStake)
    setClientStakeAmount(minStake * rateClient / 100.0)
  }, [minStake])

  const handleSubmit = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')  
      return
    }
    
    if (workTitle == "" || workDesc == "" || workUrl == "" || stakeAmount == 0 || accountMinStakeAmount == 0) {
      NotificationManager.error('Please input all iields')  
      return
    }
    if (selectedImage == null) {
      NotificationManager.error('Please select Portfolio Image')  
      return
    }
    if (clientStakeAmount > cw20Balance) {
      NotificationManager.error(`You do not have enough tokens to make work, maximum you can spend is ${cw20Balance}, but requires ${clientStakeAmount}`)
      return
    }
    event.preventDefault()
    
    let start_time = 0
    if (startDate != undefined) {
      start_time = Math.floor(startDate?.getTime() / 1000)
    }
    //console.log(start_time)

    let workId:string = toBase64(new TextEncoder().encode(walletAddress+"_"+workTitle))

    
    
    //Upload image to IPFS
    executeUploadImage(selectedImage).then((response) => {
      
      let plainMsg:string = 
      `{ \
        "create" : { \
          "id": "${workId}", \
          "client" : "${walletAddress}", \
          "work_title":"${workTitle}", \
          "work_desc": "${workDesc}", \
          "work_url": "${workUrl}", \
          "start_time": ${start_time}, \
          "account_min_stake_amount": ${accountMinStakeAmount*CW20_DECIMAL}, \
          "stake_amount": ${stakeAmount*CW20_DECIMAL}, \
          "image_url" : "${response}"
        } \
      }`
      console.log(plainMsg)
      executeSendContract(plainMsg, clientStakeAmount)
      
    }).catch((error) => {
      NotificationManager.error(`Upload image error : ${error}`)
    })
  }

  return (
    <>
      <div className='trade-cryptocurrency-area ptb-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-4 col-md-12'>
              <div className='trade-cryptocurrency-content'>
                <h1>
                  <span>Create Work</span>
                </h1>
                {/* <p>
                  <h3 style={{ "color":"white" }}>Your Balance</h3>
                  <br/>
                  <h4 style={{ "color":"white" }}>
                    {nativeBalance} JUNO <br/>
                    {cw20Balance} CREW <br/>
                  </h4>

                </p> */}
                
              </div>
            </div>
            <div className='col-lg-8 col-md-12'>
              <div className='trade-cryptocurrency-box'>
                <div className='currency-selection'>
                <span>Work Title</span>
                  <TextField fullWidth id="standard-basic"  variant="standard" 
                  value={workTitle}
                  error={workTitle==''}
                  onChange={(e) => setWorkTitle(e.target.value)}
                  />
                </div>

                <div className='currency-selection'>
                <span>Work Description</span>
                  <TextField fullWidth id="standard-basic"  variant="standard" 
                  value={workDesc}
                  error={workDesc==''}
                  onChange={(e) => setWorkDesc(e.target.value)}
                  />
                </div>

                <div className='currency-selection'>
                <span>Work URL</span>
                  <TextField fullWidth id="standard-basic"  variant="standard" 
                  value={workUrl}
                  error={workUrl==''}
                  onChange={(e) => setWorkUrl(e.target.value)}
                  />
                </div>
                
                <div className="row col-md-12">

                
                <div className="col-md-6">

                  
                  <div className="currency-selection row">
                  <span className="flex mb-2">Start DateTime for your Work</span>
                    <LocalizationProvider dateAdapter={AdapterDateFns} className="col-md-3">
                      <DateTimePicker
                        renderInput={(params) => <TextField {...params} />}
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue)
                        }}
                        minDateTime={startDate}
                      />
                    </LocalizationProvider>
                  </div>

                  

                  <div className='currency-selection'>
                    <span>Total Stake Amount for your Work(CREW)</span>
                    <TextField fullWidth type="number" 
                      variant="standard" 
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:minStake }} 
                      value={stakeAmount}
                      onChange={(e) => {
                          setStakeAmount(Number(e.target.value))
                          setClientStakeAmount(Number(e.target.value) * rateClient / 100.0)
                        }
                      }
                      error={stakeAmount==0}
                    />
                  </div>

                  <div className='currency-selection'>
                    <span>Each Account's Minimun Stake Amount for your Work(CREW)</span>
                    <TextField fullWidth type="number" 
                      variant="standard" 
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:1, max: stakeAmount }} 
                      value={accountMinStakeAmount}
                      onChange={(e) => setAccountMinStakeAmount(Number(e.target.value))}
                      error={accountMinStakeAmount==0}
                    />
                  </div>
                  
                  <div className='currency-selection'>
                    <span>Client's Self Stake Amount(CREW)</span>
                    <TextField fullWidth type="number" 
                      variant="standard" 
                      value={clientStakeAmount}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className="currency-selection">
                    <p id="file_name">Upload Portfolio Image</p>
                    
                    <input
                      accept="image/*"
                      type="file"
                      onChange={imageChange}
                    />

                    {selectedImage && (
                      <div>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Thumb"
                        />
                        {/* <button onClick={removeSelectedImage} className="default-bnt">
                          Remove This Image
                        </button> */}
                      </div>
                    )}

                  </div>
                </div>
                </div>
                <button type='submit'
                onClick={handleSubmit}
                >
                  <i className='bx bxs-hand-right'></i> Create Work
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='lines'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    </>
  );
};

export default CreateWork;
