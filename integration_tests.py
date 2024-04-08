Based on the documentation, here is the code for integration tests for the API provider:

```python
import unittest
from app import app

class TestIntegration(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_new_quote(self):
        response = self.app.post('/Quotes')
        self.assertEqual(response.status_code, 200)
        # Add more assertions as needed

if __name__ == '__main__':
    unittest.main()
```

This code snippet includes an integration test for the `get_new_quote` functionality of the API provider. You can expand the test suite with additional test cases as required.