import React from 'react';
import './style.css';

const Loading = () => (
    <div className="loadingDiv mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
        <div className="mdl-spinner mdl-js-spinner is-active"></div>
        <div>
            <label>Carregando </label>
        </div>
        
    </div>
);

export default Loading