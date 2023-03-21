import PropTypes from 'prop-types'
import Button from './button'


function Modal(props){

    console.log(props,'COMPONENT MODAL')

    return (
        <div className={`${
            props?.visible ? 'flex' : 'hidden'
        } fixed top-0 left-0 w-full h-screen justify-center bg-black bg-opacity-50  `}>
        <div className={'z-[1] relative w-2/4 h3/4 mx-auto bg-white rounded-x2'}>
            {props?.children}
            {/* props?.visible ? 'OPEN' : 'CLOSE' */}
            {/* <Button
            htmlType={'button'}
            type={'default'}
            onClick={props.onChange}
        > Close Modal</Button> */}
        </div>
        <div className={`
        absolute top-0 left-0 z-[0] bg-black bg-opacity-50 w-full h-screen`}
        onClick={props?.onChange}>

        </div>
        </div>
        
    )

}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onchange: PropTypes.func,
}
Modal.defaultProps = {
    visible: false,
    onChange: function () {
        
    }

}

export default Modal