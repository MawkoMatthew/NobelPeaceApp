import './DeviceInfo.css';
import {Browser}  from '@capacitor/browser';
import { useEffect, useState } from 'react';
import {Device} from '@capacitor/device';

interface DeviceInfo {
  isVirtual: boolean,
  manufacturer: string,
  model: string,
  operatingSystem: string,
  osVersion: string,
  platform: string,
  webViewVersion: string
}


const DeviceInfo: React.FC = () => {

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>()


  useEffect (()=> {
    (async () => {
      const info = await Device.getInfo()
      console.log(info)
      setDeviceInfo(info)
      console.log(await Device.getInfo())
    })()
  }, [])

  return (
    <div className="container">
      <strong>About This Device</strong><br/><br/><br/>
      <p>Manufacturer:    <strong>{deviceInfo?.manufacturer}</strong></p> <br/>
      <p>Model: <strong>{deviceInfo?.model}</strong></p> <br/>
      <p>OS: <strong>{deviceInfo?.operatingSystem}</strong></p><br/>
      <p>OS Version: <strong>{deviceInfo?.osVersion}</strong></p><br/>
      <p>Platform: <strong>{deviceInfo?.platform}</strong></p><br/>
      <p>webViewVerison: <strong>{deviceInfo?.webViewVersion}</strong></p><br/>
      <p>Created by: <strong>Matthew Mawko</strong></p>
      
    </div>
  );
};

export default DeviceInfo;
