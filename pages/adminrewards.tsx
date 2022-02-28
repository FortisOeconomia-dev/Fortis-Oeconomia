import { useState, useEffect, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

    executeRefundContract,
    executeApproveContract,
    executeRemoveContract

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
    // console.log(detailsAll.escrows)
    setnewData(detailsAll.escrows)
    setPageCount(Math.ceil(detailsAll?.escrows.length / coinsPerPage))

  }, [detailsAll])


  const search = (rows) => {
    return rows.filter((row) => 
    (
      row.work_title.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 || 
      row.work_desc.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 ||
      row.work_url.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 
      ));
  };

  const [listOpen, setListOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentRow, setCurrentRow] = useState(null)

  
  const handleReward = (row:any) => {
    setCurrentRow(row)
    executeApproveContract(row.id)
  }
  
  const handleRemove = (row:any) => {

    setCurrentRow(row)
    setOpen(true)
  }

  const handleListOpen = (row:any) => {
    setCurrentRow(row)
    setListOpen(true)
  }

  const handleListClose = () => {
    setListOpen(false)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (flag:any) => {
    setOpen(false)
  };

  const handleConfirmClose = (flag:any) => {
    
    setOpen(false)
    executeRemoveContract(currentRow.id)
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Really want to remove work?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Though you got reward, other accounts would still using this work. 
            Removing this will negatively affect the reputation of your site.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirmClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={listOpen}
        onClose={handleListClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          {/* <h2 id="parent-modal-title">Staked Account List : {currentRow?.account_info.length} Accounts</h2> */}
          <h2 id="parent-modal-title">Staked Account List</h2>
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
              Get reward from confirmed works
            </h2>
          </div>
          
        </div>
      </div>
      <div className='container pb-10'>
        <div className='row'>
          <div className='price-filter'>
            

            <div className='col-md-3'>
              Search:{' '}
              <input
                type='text'
                className='crypto-search'
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
          <div className='cryptocurrency-table table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Title</th>
                  <th scope='col'>Desc</th>
                  <th scope='col'>Url</th>
                  <th scope='col'>Required Amount</th>
                  <th scope='col'>Reward Amount</th>
                  <th scope='col'>Staked List</th>
                  <th scope='col'>Start Time</th>
                  <th scope='col'>Action</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* slice(0, parseInt(value)) */}
                {newData &&
                  newData.length > 0 &&
                  search(newData)
                    .slice(0 || pagesVisited, pagesVisited + coinsPerPage)
                    .map((data) => (
                      !(data.expired && data.state > 1) ? <></> :
                      <tr key={data.id} style={{ "backgroundColor" : (data.state == 2 ? "#00FF0040" : "#FF00FF40")}}>
                        
                        <td>{data.work_title}</td>
                        <td>{data.work_desc}</td>
                        <td><a href={data.work_url}>{data.work_url}</a></td>
                        <td>{data.stake_amount / CW20_DECIMAL}</td>
                        <td>{data.cw20_balance[0].amount / CW20_DECIMAL}</td>
			                  <td>
                          {
                            <button
                              style={{"backgroundColor": "var(--bs-indigo)" }}
                              className="block default-btn w-full max-w-full truncate"
                              onClick={(e) => handleListOpen(data)}
                              >
                                <i className="bx bx-right-arrow"></i>
                                {data.account_info.length}&nbsp;&nbsp;View
                            </button>
                          }
                          
                        </td>	
                        <td>{moment(new Date(data.start_time * 1000)).format('YYYY/MM/DD HH:mm:ss')}</td>
                        
                        <td>
                          <button
                            className="block default-btn w-full max-w-full truncate"
                            style={{
                              "backgroundColor": (
                                data.state > 2 ? "var(--bs-gray)" : ""
                              ) 
                            }}
                            disabled={data.state > 2}
                            onClick={(e) => handleReward(data)}
                            >
                                <i className= 'bx bxs-like bx-lg'></i> 
                                {
                                  data.state > 2? "Done" : "Reward"
                                }
                          </button>
                        </td>
                        <td>
                          <button
                            className="block default-btn w-full max-w-full truncate"
                            style={{
                              "backgroundColor": (
                                data.state < 3 ? "var(--bs-gray)" : ""
                              ) 
                            }}
                            disabled={data.state < 3}
                            onClick={(e) => handleRemove(data)}
                            >
                                <i className= 'bx bxs-like bx-lg'></i> 
                                {
                                  data.state < 3 ? "Unable" : "Delete"
                                }
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            <div className='count-pagination'>
              <p className='price-count'>
                Showing 1 to 20 of {newData?.length} entries
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
