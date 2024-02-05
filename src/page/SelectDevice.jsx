import React from 'react';

const SelectDevice = ({selectDevice, setKeyword, setSize, maxPage, setPage, selectOffice, size, keyword, page, element, setViewInfo}) => {
	
  return (
    <div className="modal fade" id="deviceSelectModal" tabIndex={-1} aria-labelledby='deviceSelectModalLabel' aria-hidden='true'>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content" style={{width:'auto'}}>
					<div className="modal-header modal-border">
						<h3 className="modal-title fs-6 fw-bold" id='deviceSelectModalLabel'>단말기 선택</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
          
					<div className="modal-body">
						<div className='searchKeyword mb-3' style={{color:'black'}}>
							<div className='fw-bold'>■ 검색(단말기 S/N, IMEI, 펌웨어)</div>
							<input
								type="text"
								name="keyword"
								id="device-keyword"
								placeholder='검색어를 입력하세요.'
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
								style={{color:'black',border:'1px solid black', paddingBottom:'0px'}}
							/>
						</div>
						<div className='searchKeyword mb-3' style={{color:'black'}}>
							<div className='fw-bold'>■ 페이지당 단말기 수 선택</div>
							<select
								className='w-25 text-center'
								name="device_number"
								id="number"
								value={size}
								onChange={(e) => {
									setSize(e.target.value)
									// getPageNumber(selectOffice.id, e.target.value)
								}}
							>
								<option value='10'>10</option>
								<option value='20'>20</option>
								<option value='30'>30</option>
								<option value='50'>50</option>
								<option value='80'>80</option>
								<option value='100'>100</option>
							</select>
							<span className='ms-2' style={{opacity:'0.5'}}>(Default : 10)</span>
						</div>
						{maxPage !== 0 ? (
						<div className='searchKeyword' style={{color:'black'}}>
							<div className='fw-bold'>■ 페이지 선택 (1~{maxPage})</div>
								<input
									type="text"
									name="keyword"
									id="device-keyword"
									placeholder='페이지 수를 입력하세요.'
									value={page}
									onChange={(e) => setPage(e.target.value)}
									style={{color:'black',border:'1px solid black', paddingBottom:'0px'}}
								/>
							<span className='ms-2' style={{opacity:'0.5'}}>(Default : 1)</span>
						</div>
						) : (
							<>
							</>
						)}

					</div>
          <div className='modal-footer justify-content-center'>
            {maxPage === 0 ? (
							<button style={{borderRadius:'10px', border:'none', backgroundColor:'rgb(70, 100, 255)', color:'white', padding:'8px'}}
								onClick={() => {
									selectDevice(selectOffice.id, size, keyword, 1)
								}}
							>
								단말기 조회
							</button>
						) : (
							<div className='d-flex gap-3'>
								<button style={{borderRadius:'10px', border:'none', backgroundColor:'rgb(70, 100, 255)', color:'white', padding:'8px'}}
									onClick={() => {
										selectDevice(selectOffice.id, size, keyword, page)
										setViewInfo(true)
									}}
									data-bs-dismiss="modal"
								>
									선택
								</button>
								<button style={{borderRadius:'10px', border:'none', backgroundColor:'rgb(250, 100, 100)', color:'white', padding:'8px'}}
									onClick={() => {
										selectDevice(selectOffice.id, element, keyword, 1)
										setViewInfo(true)
									}}
									data-bs-dismiss="modal"
								>
									모든 단말기 선택
								</button>
							</div>
						)}
					
          </div>
				</div>
			</div>
		</div>
  );
};

export default SelectDevice;