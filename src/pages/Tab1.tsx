import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonItem, IonLabel,IonInfiniteScroll,IonInfiniteScrollContent,IonSearchbar,IonLoading } from '@ionic/react';
import { response } from 'express';
import { useEffect, useState } from 'react';
import DeviceInfo from '../components/DeviceInfo';
import './Tab1.css';
import axios from 'axios';
import { idCard } from 'ionicons/icons';
import {medal, informationCircle} from 'ionicons/icons';

let nextLink: string = `https://api.nobelprize.org/2.1/laureates`;
let totalCount: number = 100;



const Tab1: React.FC = () => {

  
  const [laureates, setLaureates] = useState<Array<any>> ([])
  const [isScrollDisabled, setScrollDisabled] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [showLoading, setShowLoading] = useState<boolean>(true)


  const retriveData = () => {
    return new Promise((resolve,reject) => {
      axios.get(nextLink)
      .then(response => {
        nextLink = (response.data.links && response.data.links.next) ? response.data.links.next : ''
        totalCount = response.data.meta.count
        const newLaureates = response.data.laureates.map((laureate: any) => {
          return {
            id: laureate.id,
            name: (laureate.fullName !== undefined) ? laureate.fullName.en : laureate.orgName.en
          }
        })
        resolve(newLaureates)
      })

    })

  
   
  }



  // step 1: get data

  useEffect(()=> {

    (async () =>
    {console.log('Search has been called')
    nextLink = `https://api.nobelprize.org/2.1/laureates?name=${searchText}`
    const newLaureates: any = await retriveData()
    setLaureates(newLaureates)
  })()
    
  }, [searchText])


  useEffect(()=> {
  (async () => {
    const newLaureates: any = await retriveData()
    setLaureates(newLaureates)
  }) ()
  }, [])



  useEffect(() => {
    axios.get(nextLink)
    .then(response => {
      nextLink = (response.data.links && response.data.links.next) ? response.data.links.next: ''
      totalCount = response.data.meta.count
      const NewLaureates = response.data.laureates.map((laureate: any) => {
        return {
          id: laureate.id,
          name: laureate.fullName.en
        }
      })
      
      setLaureates(NewLaureates)
      setShowLoading(false)
    })
  },[searchText])



 useEffect(() => {
   console.log(laureates.length)
   if(laureates.length === totalCount) {
      //disable the infinite scroll
      setScrollDisabled(true)
   }
 }, [laureates])


  const LoadMoreData = (e: CustomEvent) => {
    console.log('LoadMoreData:')
    
    axios.get(nextLink)
    .then(response => {
      nextLink = response.data.links.next
      const NewLaureates = response.data.laureates.map((laureate: any) => {
        return {
          id: laureate.id,
          name: (laureate.fullName !== undefined) ? laureate.fullName.en : laureate.orgName.en
        };
      });
      
     

      (e.target as HTMLIonInfiniteScrollElement).complete();
      

      setLaureates([
        ...laureates,
        ...NewLaureates
      ])
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nobel Laureates 🏆</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar>
      <IonSearchbar value={ searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
      <IonContent fullscreen>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Loading Data...'}
        duration={5000}
      />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Laureates</IonTitle>
          </IonToolbar>
    
        </IonHeader>
        
      <IonList>
        {
          laureates.map((laureate:any) => {
            
            return ( <IonItem routerLink={`/tab1/details/${laureate.id}`} key={laureate.id} button detail>
              <IonLabel>{laureate.name}</IonLabel>
            </IonItem>)
          })
        }
      <IonInfiniteScroll
          onIonInfinite={LoadMoreData}
          threshold="100px"
          disabled={isScrollDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
 

export default Tab1;
