import PropTypes from 'prop-types'

function Button(props){
    
    return <button 
    className=' p-4 !bg-orange-400 !rounded-xl !transition duration-300 hover:!bg-blue-900'
    {...props}
    type={props?.htmltype}
      
    >{props?.children}</button>
}

Button.propTypes = {
    htmltype: PropTypes.oneOf(['button', 'submit']).isRequired,
    type: PropTypes.oneOf(['primary', 'default']).isRequired,
    onClick: PropTypes.func.isRequired,
}
Button.default = {
    htmltypes:'button',
    type: 'default',
    onClick: function (event) {
        console.log(event)
    }
}

export default Button 