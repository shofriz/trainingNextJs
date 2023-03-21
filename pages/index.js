import { useState } from "react";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import { Navbar } from "@/src/components/navbar.components";
import Image from 'next/image';


export default function Home() {
  const [visible, setVisible] = useState(false);

  function onChangeModal(){
    setVisible(!visible)
  }
  return (
    <div>

      <p className="btn-danger">HALLOOO BEIJING</p>
      <Navbar/>


      <Button
        htmltype={'button'}
        type={'primary'}
        onClick={onChangeModal}
        className="btn-danger"
      >  Bla bla bla</Button>



        <Button
          htmltype={'button'}
          type={'default'}
          onClick={(event) => {
            console.log(event,'BUTTON 1');
          }}
          className="btn-green"
        > BUTTON 1 </Button>

        <Modal
        visible={visible}
        onChange={onChangeModal}
        >
        <div className={'w-full flex items-center justify-center h-full'}>
          <h1 className={'text-2xl'}>Modal</h1>
          <Button
            htmltype={'button'}
            type={'default'}
            onClick={onChangeModal}
            className="btn-green"
          > Close Modal</Button>
        </div>

          </Modal>

<Button
        htmltype={'button'}
        type={'primary'}
        onClick={(event) => {
          console.log(event,'Button 2');
        }}
        className="btn-warning"
      >  BUTTON 2 </Button>
    <div className="h-screen w-full">

        <div className="h-screen w-full">
            <Image
              src="/images.jpg"
              alt="Picture of the author"
              width={500}
              height={500}
            />

          </div>

          <div className="h-screen w-full">
            <Image
              src="/123.jpg"
              alt="Picture of the author"
              width={500}
              height={500}
            />

          </div>
          
          <div className="h-screen w-full">
            <Image
              src="/321.jpg"
              alt="Picture of the author"
              width={500}
              height={500}
            />

          </div>


    </div>
      
      <h1 className={'text-red-500'} >Home Pages</h1>
    </div>
  )
}