import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// to optimize bundle, explicitly importing only the icons used
import {
  faArrowRight,
  faCalculator,
  faCheck,
  faTasks,
  faTimes,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faEdit,
  faEye,
  faExclamationTriangle,
  faFileAlt,
  faFolderPlus,
  faLayerGroup,
  faLock,
  faPaperPlane,
  faPlusCircle,
  faSignOutAlt,
  faSpinner,
  faUnlock,
  faUserCog,
  faUserPlus,
  faUserShield,
  faEnvelope,
  faPeopleArrows
} from '@fortawesome/free-solid-svg-icons';

import {
  faCircle,
  faClock,
  faTimesCircle
} from '@fortawesome/free-regular-svg-icons';

const Check = ({ ...props }) => <FontAwesomeIcon icon={faCheck} {...props} />;
const Xmark = ({ ...props }) => <FontAwesomeIcon icon={faTimes} {...props} />;
const CheckCircle = ({ ...props }) => (
  <FontAwesomeIcon icon={faCheckCircle} {...props} />
);
const File = ({ ...props }) => <FontAwesomeIcon icon={faFileAlt} {...props} />;
const Envelope = () => <FontAwesomeIcon icon={faEnvelope} />;
const PDFFile = () => (
  <img src="../static/img/pdf_doc.svg" alt="PDF" width="16em" />
);
const LockIcon = () => <FontAwesomeIcon icon={faLock} />;
const Spinner = ({ ...props }) => (
  <FontAwesomeIcon icon={faSpinner} {...props} />
);
const TimesCircle = () => <FontAwesomeIcon icon={faTimesCircle} />;
const UnlockIcon = () => <FontAwesomeIcon icon={faUnlock} />;

export {
  faArrowRight,
  faCalculator,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faClock,
  faEdit,
  faEye,
  faExclamationTriangle,
  faFolderPlus,
  faLayerGroup,
  faLock,
  faPlusCircle,
  faSignOutAlt,
  faSpinner,
  faTasks,
  faTimesCircle,
  faUnlock,
  Check,
  Xmark,
  CheckCircle,
  File,
  Envelope,
  PDFFile,
  LockIcon,
  Spinner,
  TimesCircle,
  UnlockIcon,
  faUserCog,
  faUserShield,
  faUserPlus,
  faPaperPlane,
  faPeopleArrows
};

export default FontAwesomeIcon;
