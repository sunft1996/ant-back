import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = str => {
  Authorized = RenderAuthorized(getAuthority(str));
};

export { reloadAuthorized };
export default Authorized;
