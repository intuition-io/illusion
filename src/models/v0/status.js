/*jslint node: true */
'use strict';

module.exports = {
  version: '0.0.8',
  components: [
    {
      'name': 'workers',
      'state': {
        'celery@neezy.laptop-300E5A': [
          'telepathy.backends.finance.trade'
        ]
      },
      'version': '3.1.14'
    }, {
      'name': 'intuition',
      'state': 'installed',
      'version': '0.5.0'
    }, {
      'name': 'insights',
      'state': 'installed',
      'version': '0.3.2'
    }
  ]
};
