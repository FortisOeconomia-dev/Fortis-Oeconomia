import { useState, useEffect, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

import axios from 'axios';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
const ascen = '../images/sort_asc.png';
const descen = '../images/sort_desc.png';
import {NotificationContainer, NotificationManager} from 'react-notifications'
import moment from 'moment'
import { useSigningClient } from '../contexts/cosmwasm'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { CW20_DECIMAL } from '../hooks/cosmwasm'
import Select from 'react-select'

const options = [
  { value: 0, label: 'All' },
  { value: 1, label: 'Started' },
  { value: 2, label: 'Not Started' }
]

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const StakeWork = () => {
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
    getDetailsAll,
    detailsAll,

    executeRefundContract

  } = useSigningClient()

  const [newData, setnewData] = useState([]);
  
  //search
  const [q, setQ] = useState('');
  //selec value
  const [value, setValue] = useState(10);

  //paginate
  const [pageNumber, setpageNumber] = useState(0)
  const coinsPerPage = 20;
  const pagesVisited = pageNumber * coinsPerPage;
  const [pageCount, setPageCount] = useState(0)
  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      setnewData(null)
      return
    }
    getDetailsAll()
  }, [signingClient, walletAddress])

  useEffect(() => {
    if (detailsAll == null || detailsAll.escrows == null) {
      return
    }
    setnewData(detailsAll.escrows)
    setPageCount(Math.ceil(detailsAll?.escrows.length / coinsPerPage))

  }, [detailsAll])


  const search = (rows) => {
    return rows.filter((row) => 
    (
      (row.work_title.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 || 
      row.work_desc.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 ||
      row.work_url.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 ) &&
      (currentOption == 0 ? true : currentOption == 1 ? (row.expired && row.state > 0 ): !(row.expired && row.state > 0 ))
      ));
  };

  const [stakeOpen, setStakeOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [minEndDate, setMinEndDate] = useState<Date | null>(new Date())
  const [stakeAmount, setStakeAmount] = useState(0)
  const [currentRow, setCurrentRow] = useState(null)
  const [currentOption, setCurrentOption] = useState(0)

  const handleStakeOpen = (row:any) => {
    setCurrentRow(row)
    if (row.my_staked > 0) {
      //Refund
      executeRefundContract(row.id)

    } else {
      //Stake
      setStartDate(new Date())
      setEndDate(new Date())
      setMinEndDate(new Date(row.start_time * 1000))
      setStakeOpen(true)
    }
  }

  const handleStakeClose = () => {
    setStakeOpen(false)
  };

  const handleListOpen = (row:any) => {
    setCurrentRow(row)
    setListOpen(true)
  }

  const handleListClose = () => {
    setListOpen(false)
  };

  const handleStake = (event: MouseEvent<HTMLElement>) => {
    if (stakeAmount < currentRow?.account_min_stake_amount / CW20_DECIMAL) {
      NotificationManager.error(`Stake at least ${(currentRow?.account_min_stake_amount / CW20_DECIMAL)} CREW`)
      return
    }

    if (startDate > endDate) {
      NotificationManager.error(`End date must be later than start date.`)
      return
    }

    if (endDate < minEndDate) {
      NotificationManager.error(`End date must be later than work's start date.`)
      return
    }

    event.preventDefault()

    let start_time = 0
    let end_time = 0
    start_time = Math.floor(startDate?.getTime() / 1000)
    end_time = Math.floor(endDate?.getTime() / 1000)

    let plainMsg:string = 
      `{ \
        "top_up" : { \
          "id": "${currentRow.id}", \
          "start_time": ${start_time}, \
          "end_time": ${end_time}
        } \
      }`
    console.log(plainMsg)

    executeSendContract(plainMsg, stakeAmount)
    setStakeOpen(false);
  }

  const handleOptionChange = (selectedOption) => {
    console.log(selectedOption)
    // this.setState({ selectedOption }, () =>
    //   console.log(`Option selected:`, this.state.selectedOption)
    // );
    setCurrentOption(selectedOption.value)
  };


  return (
    <>
      <Modal
        open={stakeOpen}
        onClose={handleStakeClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <h2 id="parent-modal-title">Stake to Work : {currentRow?.work_title}</h2>
          <div className='trade-cryptocurrency-box'>

            <div className="currency-selection row">
            <span className="flex mb-2">Start DateTime</span>
              <LocalizationProvider dateAdapter={AdapterDateFns} className="col-md-3">
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue)
                  }}
                  minDateTime={new Date()}
                />
              </LocalizationProvider>
            </div>

            <div className="currency-selection row">
            <span className="flex mb-2">End DateTime</span>
              <LocalizationProvider dateAdapter={AdapterDateFns} className="col-md-3">
              <DateTimePicker
                className="max-w-full text-2xl"
                renderInput={(params) => <TextField {...params} />}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue)
                }}
                minDateTime={minEndDate}
              />
              </LocalizationProvider>
            </div>
            

            <div className='currency-selection'>
              <span>Stake Amount (Min: {currentRow?.account_min_stake_amount / CW20_DECIMAL} CREW)</span>
              <TextField fullWidth type="number" 
                variant="standard" 
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:currentRow?.account_min_stake_amount / CW20_DECIMAL }} 
                value={stakeAmount}
                onChange={(e) => {
                    setStakeAmount(Number(e.target.value))
                  }
                }
                error={stakeAmount==0}
              />
            </div>

            <button type='submit'
             onClick={handleStake}
            >
              <i className='bx bxs-hand-like'></i> Stake
            </button>
          </div>
          
        </Box>
      </Modal>

      <Modal
        open={listOpen}
        onClose={handleListClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          {/* <h2 id="parent-modal-title">Staked Account List : {currentRow?.account_info.length} Accounts</h2> */}
          <h2 id="parent-modal-title">My Staked Information</h2>
          <div className='trade-cryptocurrency-box'>

          <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Address</th>
                  <th scope='col'>Staked</th>
                  <th scope='col'>Start Time</th>
                  <th scope='col'>End Time</th>
                </tr>
              </thead>
              <tbody>
                {currentRow?.account_info &&
                  currentRow?.account_info.length > 0 &&
                  currentRow?.account_info
                    .map((data) => (
                      <tr key={data.id}>
                        
                        <td>{data.addr}</td>
                        <td>{data.amount / CW20_DECIMAL}</td>
                        <td>{moment(new Date(data.start_time * 1000)).format('YYYY/MM/DD HH:mm:ss')}</td>
                        <td>{moment(new Date(data.end_time * 1000)).format('YYYY/MM/DD HH:mm:ss')}</td>
                      </tr>
                    ))}
              </tbody>
            </table>


            <button type='submit'
             onClick={handleListClose}
            >
              <i className='bx bxs-right-arrow'></i> OK
            </button>
          </div>
          
        </Box>
      </Modal>
      <div className='market-health-area pt-100 pb-10'>
        <div className='container'>
          <div className='section-title'>
            <h2>
              Stake to interesting works
            </h2>
          </div>
          
        </div>
      </div>
      <div className='container pb-10'>
        <div className='row'>
          <div className='price-filter'>
            

            <div className='col-md-3 d-flex align-items-center'>
              <span className="col-md-3">Search:{' '}</span>
              <input
                type='text'
                className='crypto-search col-md-9'
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className='col-md-3 row d-flex align-items-center'>
              <span className="col-md-3">View:{' '}</span>
              
              <Select options={options} className="col-md-9"
              onChange={handleOptionChange}
              defaultValue={{ label: "All", value: 0 }}
              />
            </div>
          </div>
          <div className='cryptocurrency-table table-responsive'>

            <div className='row align-items-center justify-content-center'>


              {newData &&
                newData.length > 0 &&
                search(newData)
                  .slice(0 || pagesVisited, pagesVisited + coinsPerPage)
                  .map((data) => (
                    data.client == walletAddress ? <></> :
                    <>
                    <div className='col-lg-3 col-md-4 col-sm-4'>
                      <div className='single-features-box'>
                        <img src={data.image_url} alt='image' style={{ "height":"200px" }}/>
                        <h2>{data.work_title}</h2>
                        <h3>{data.work_desc}</h3>
                        <h4><a href={data.work_url}>{data.work_url}</a></h4>
                        <td> {data.my_staked > 0? "My staked : " + data.my_staked / CW20_DECIMAL: ""}</td>
                        {data.my_staked > 0 ?
                          <button
                            style={{"backgroundColor": "var(--bs-indigo)" }}
                            className="block default-btn w-full max-w-full truncate"
                            onClick={(e) => handleListOpen(data)}
                            >
                              <i className="bx bx-right-arrow"></i>
                              {data.account_info.length}&nbsp;&nbsp;View
                          </button> : <></>
                        }
                        <h5>Starts on {moment(new Date(data.start_time * 1000)).format('YYYY/MM/DD HH:mm:ss')}</h5>
                        <span>
                          <button
                            className="block default-btn w-full max-w-full truncate"
                            style={{
                              "backgroundColor": (
                                data.expired && data.state > 0 ? "var(--bs-gray)" : (data.my_staked > 0 ? "var(--bs-pink)": "")
                              ) 
                            }}
                            disabled={data.expired && data.state > 0}
                            onClick={(e) => handleStakeOpen(data)}
                            >
                                <i className= 'bx bxs-like bx-lg'></i> 
                                {
                                  data.expired && data.state > 0? "Started" : 
                                  (data.my_staked > 0 ? "Refund" : "Stake")
                                }
                          </button>
                        </span>
                        
                      </div>
                    </div>
                    </>
                  ))}

            </div>
            

            <div className='count-pagination'>
              <p className='price-count'>
                {/* Showing 1 to 20 of {newData?.length} entries */}
              </p>

              <div className='pagination'>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  activeClassName='current'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakeWork;
