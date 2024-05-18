import { Button } from '../Button';
import { ButtonText } from '../ButtonText';

import toggleModal from '../../utils/toggleModal.js';

export function LoggedOutUser() {
    return (
        <div>
            <ButtonText title="Cadastrar" to="/register" />
            <Button type="button" $border="true" title="Login" onClick={toggleModal} id="loginHeaderButton"/>
        </div>
    );
}