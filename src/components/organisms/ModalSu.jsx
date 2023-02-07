import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditForm from "../templates/FormEditSu";




const ModalForm = (props) => {



    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);




        
 
    
      
    return (
        <div>

            <Button color="primary" onClick={toggle}>Editar</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Editar</ModalHeader>
                <ModalBody>
                    <EditForm item={props.item} 
                    admins={props.admins}
                    setAdmins={props.setAdmins}
                    toggle = {props.toggle}
                    />
                </ModalBody>
            </Modal>

        </div>
    );



}

export default ModalForm;