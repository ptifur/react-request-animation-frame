const Header = ({ muted, onChange }) => {
    return (
        <div className="header">
            <div>
                <h2>Poung in React</h2>
            </div>
            <div className='nav'>
                <button className='headerButton' onClick={() => onChange(!muted)}>{muted ? 'Unmute' : 'Mute'}</button>
                <a href='https://github.com/ptifur/react-request-animation-frame/tree/poung' target="_blank" rel="noopener noreferrer">Source code</a>
            </div>
        </div>
    )
}

export default Header