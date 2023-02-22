import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditForm from "../templates/FormNewSu";





const ModalForm = (propsNew) => {

   

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

   
    




   

   
    

    return (
        <div>

            <Button className="subir" onClick={toggle}>
                {propsNew.buttonLabel}
            </Button>
            <Modal isOpen={modal}
                toggle={toggle}
                className={propsNew.className}
                backdrop={'static'}
                keyboard={false}
            >
                <ModalHeader toggle={toggle}>{propsNew.buttonLabel}</ModalHeader>
                <ModalBody>
                    <EditForm


                        updateState={propsNew.updateState}
                        toggle={toggle}
                        
                        
                    />
                </ModalBody>
            </Modal>
        </div>
    );



}

export default ModalForm;