import { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';

export const TutorRoute = ({ Component, ...props }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const verifyLogin = useCallback(async () => {
    setLoading(true);

    try {
      const authResponse = await fetch('http://localhost:3000/api/login/auth');
      if (authResponse.status !== 200) {
        throw new Error(authResponse.error);
      }

      const { userid } = await authResponse.json();
      const tutorResponse = await fetch(
        `http://localhost:3000/api/tutor/${userid}`
      );
      if (tutorResponse.status !== 200) {
        throw new Error(tutorResponse.error);
      }

      setLoading(false);
    } catch (err) {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    verifyLogin();
  }, [verifyLogin]);

  if (loading) {
    return <Spinner color='primary' />;
  }

  return (
    <Route {...props}>
      <Component />
    </Route>
  );
};

export default TutorRoute;
