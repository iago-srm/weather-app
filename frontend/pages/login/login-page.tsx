import * as React from 'react';
import { Frame } from '../../components/frame';
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import { H1 } from '../../components/typograpy';
import { MUIInput, MUIPasswordInput } from '../../components/mui';
import { Input, Form } from '../../components/react-hook-form';

export const LoginPage: React.FC<{}> = () => {

  return (
    <Grid style={{height: '100%'}}>
      <Row center='xs' middle='xs' style={{height: '100%'}}>
        <Col xs={12} sm={10} md={6}>
          <Frame>
            <H1>Entrar</H1>
              <Form onSubmit={(data: any) => console.log(data)}>
                <Input name="email"/>
                <Input name="senha"/>
                <button type='submit'>Enviar</button>
              </Form>
              {/* <MUIInput label='e-mail'/>
              <MUIPasswordInput /> */}
          </Frame>
        </Col>
      </Row>
    </Grid>
  );
}