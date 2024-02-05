import React from 'react';

const SelectOffice = ({selectOffice, setSelectOffice, officeList, getPageNumber}) => {
	
  return (
    <div className="modal fade" id="officeSelectModal" tabIndex={-1} aria-labelledby='officeSelectModalLabel' aria-hidden='true'>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content" style={{width:'auto'}}>
					<div className="modal-header modal-border">
						<h3 className="modal-title fs-6 fw-bold" id='officeSelectModalLabel'>사업소 선택</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
          
					<div className="modal-body text-center">
					{officeList.map((el, i) => {
						return (
							<div
								className='hoverDiv mb-3 fw-bold fs-5'
								key={i}
								onClick={() => {
									setSelectOffice({name: el.name, id: el.id})
									// getPageNumber(el.id, 10)
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

export default SelectOffice;