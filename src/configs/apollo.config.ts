import { inject } from '@angular/core'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { environment } from '../environments/environment'
import { Flags } from 'apollo-angular'

export const apolloConfig = () => {
  const httpLink = inject(HttpLink)
  const { apiUrl } = environment

  return {
    link: httpLink.create({
      uri: apiUrl,
      withCredentials: true,
    }),
    cache: new InMemoryCache(),
  }
}

export const loadingOptions: Flags = {
  useInitialLoading: true,
  useMutationLoading: true,
}
