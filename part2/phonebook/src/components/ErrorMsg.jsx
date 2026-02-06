const ErrorMsg = ({ message }) => {
    const errStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    
    if (message === null) {
        return null
    }

    return (
        <div style={errStyle}>
            {message}
        </div>
    )
}

export default ErrorMsg