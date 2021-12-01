import React, { useState, useEffect, FC } from "react"
import {
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react"
import { Friend } from "../../components"
import { useResultsUsers } from "./useResultsUsers"

interface Props {
  query: string
}

const ResultsUsers: FC<Props> = ({ query }) => {
  const { users, loadMore, isInfiniteDisabled } = useResultsUsers(query)

  return (
    <div>
      <IonList>
        {users.map((item, index) => (
          <Friend {...item} key={index} />
        ))}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={loadMore}
        threshold="100px"
        disabled={isInfiniteDisabled}>
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </div>
  )
}

export default ResultsUsers
