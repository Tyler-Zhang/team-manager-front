export const API_URL = 'http://localhost:9000'
export const API_LOGIN = '/api/users/login'   
export const API_SIGNUP = '/api/users/signup'   
export const API_POST_USERS = '/api/users'
export const API_GET_USERS = '/api/users'
export const API_GET_USERS_PREVIEW = '/api/users/all/preview'
export const API_GET_TEAMS = '/api/teams'
export const API_GET_TEAMS_PREVIEW = '/api/teams/all/preview'
export const API_POST_POSITION = '/api/positions'
export const API_DELETE_POSITION = '/api/positions'
export const API_GET_ACCOUNT = '/api/users/me/info'
export const API_REDIRECT_GOOGLE = '/api/google/redirect'
export const API_POST_TEAMS = '/api/teams'
export const API_GET_TEAM_BY_ID = (teamId: number | string) => `/api/teams/${teamId}`
export const API_GET_ADMIN_GOOGLE_TOKEN = '/api/google/token/admin'
export const API_GET_GOOGLE_TOKEN = '/api/google/token'
export const API_POST_TEAM_FILE = (teamId: number | string) => `/api/teams/${teamId}/files`
export const API_GET_FILE_INFO = (fileId: string) => `/api/google/file/${fileId}`
