import React from 'react';
import './style.css';

const Loading = () => (
    <div className="loadingDiv">
        <div class="mdl-spinner mdl-js-spinner is-active"></div>
        <div>
            <label>Carregando </label>
        </div>
        
    </div>
);

export default Loading