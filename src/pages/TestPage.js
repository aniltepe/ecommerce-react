import { Outlet } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

function TestPage() {
  // const { t } = useTranslation();
  return (
    <>
      <div style={{width: "100%", height: "100%", backgroundColor: "blue"}}>
        Uygulama özelliklerini kullanmak için üye olunuz
      </div>
      <Outlet />
    </>
  );
}


export default TestPage;
