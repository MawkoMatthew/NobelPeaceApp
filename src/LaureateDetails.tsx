import { IonCard, IonContent, IonBackButton,IonButtons, IonHeader, IonPage, IonTitle, IonToolbar,IonCardContent,IonCardHeader,IonCardSubtitle,IonCardTitle,IonSearchbar, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import './LaureateDetails.css';
import {Browser}  from '@capacitor/browser';

import axios from 'axios';
import { pricetag } from 'ionicons/icons';

interface RouteParams {

    id: string;
}

const LaureatesDetails: React.FC<RouteComponentProps<RouteParams>> = ({ match}) => {


  const [laureate,setLaureate] = useState<any>({})

    



  useEffect(() => {
    axios.get (`https://api.nobelprize.org/2.1/laureate/${match.params.id}`)
    .then(response => {
        console.log(response.data[0])
        setLaureate(response.data[0])
    })
  }, [])



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
          <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Laureates Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Laureates Details</IonTitle>
          </IonToolbar>

        </IonHeader>
        
        {
            laureate.id && 
            <>
            <h1 style={{ margin: 30}}>{laureate.fullName ? laureate.fullName.en: laureate.orgName.en}🏅</h1>
            
            {
              laureate.nobelPrizes.map((prize:any, index: number ) => {
                return (<IonCard key={ index}>

                  <IonCardHeader>
                  
                  <IonCardSubtitle>Laureate</IonCardSubtitle>
                  
                  <IonCardTitle>Category: {prize.category.en} 💎</IonCardTitle>
                  <br/>
                  
                  {/* <IonCardTitle> Birthdate: {laureate.birth.date}</IonCardTitle> */}
                
                  <IonCardTitle> Nobel Prize Year: {prize.awardYear} - { prize.categoryFullName.en} </IonCardTitle>
                  {/* <IonCardTitle>Gender: {laureate.gender}</IonCardTitle> */}
                  <br/>
                  <IonCardTitle>Date Award: {prize.dateAwarded}</IonCardTitle>

                  <IonCardTitle>Prize Amount: ${prize.prizeAmountAdjusted}</IonCardTitle>
                  
                  </IonCardHeader>
                  
                  <IonCardContent>
                  
                  {prize.motivation.en}
                  

                  </IonCardContent>
                  
                  </IonCard>)
              })
            }
            <IonButton onClick={async() => {
    
    await Browser.open({ url: laureate.wikipedia.english });
  
}}>Read Bio</IonButton>
</>    }
      </IonContent>
    </IonPage>
  );
};

export default LaureatesDetails;
