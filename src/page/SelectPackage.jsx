import React from 'react';

const SelectPackage = ({packageList, setSelectPackage, selectPackage, setCampaignInfo, campaignInfo}) => {
	
  return (
    <div className="modal fade" id="packageSelectModal" tabIndex={-1} aria-labelledby='packageSelectModalLabel' aria-hidden='true'>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content" style={{width:'auto'}}>
					<div className="modal-header modal-border">
						<h3 className="modal-title fs-6 fw-bold" id='packageSelectModalLabel'>패키지 선택</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
          
					<div className="modal-body text-center">
					{packageList.map((el, i) => {
						return (
							<div
								className='hoverDiv mb-3 fw-bold fs-5'
								key={i} onClick={() => {
									setSelectPackage({name: el.name, id: el.id})
									setCampaignInfo({...campaignInfo, firmwarePackageID: el.id})
								}}
								data-bs-dismiss="modal"
							>
								<div style={{padding:'10px'}}>
									{el.name}
								</div>
								
							</div>
						)
					})}
					</div>
          <div className='modal-footer justify-content-center'>
            
          </div>
				</div>
			</div>
		</div>
  );
};

export default SelectPackage;