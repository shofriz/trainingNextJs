const ErrorHandler = (err, req, res, next) => {
    const { status, message , errors } = err
    const errObj = {
        status: status || 500,
        message: message || 'Internal Server Error',
        errors: errors || null

    }

    return res.status(errObj.status).json({
        ...errObj,
        error: true,
        message: errObj?.message,
        data:err,

    })
}

export default ErrorHandler 