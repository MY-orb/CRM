import { observer, useLocalObservable } from 'mobx-react';

const initialState = {
  phone: 's',
  code: 's',
  setPhone(str: string) {
    this.phone = str;
  },
};
const Test = observer(() => {
  const store = useLocalObservable(() => initialState);
  const { phone, code, setPhone } = store;
  return (
    <div>
      <div onClick={() => setPhone('1212')}>{phone}</div>
      <div>{code}</div>
    </div>
  );
});

export default Test;
