import React, { forwardRef } from 'react';
import { Container } from './styles';

const Input = forwardRef(({icon: Icon, ...rest}, ref) => {
    return(
        <Container>
            {Icon && <Icon size={20} />}
            <input ref={ref} {...rest} />
        </Container>
    );
});

export { Input };