window.setTimeout(() => {
  if (WEBS && WEBS.boards && WEBS.boards['Legends of the Hidden Template'] && window.location.href.indexOf('rapidView=' + WEBS.boards['Legends of the Hidden Template'].id) > 0) {
    const styleTag = document.createElement('style');
    const css = `
    .custom-blocked-issue {
      background-color: rgba(255,0,0,0.1) !important;
    }
    .custom-blocked-issue .ghx-grabber {
      background: repeating-linear-gradient(
        45deg,
        #c00,
        #c00 5px,
        #fee 5px,
        #fee 10px
      );
    }
    .custom-blocking-issue {
      background-color: rgba(0,255,0,0.1) !important;
    }
    .custom-blocking-issue .ghx-grabber {
      background: repeating-linear-gradient(
        45deg,
        #efe,
        #efe 5px,
        #070 5px,
        #070 10px
      );
    }
    .custom-blocked-issue.custom-blocking-issue {
      background-color: rgba(255, 130, 0, 0.1) !important;
    }
    .custom-blocked-issue.custom-blocking-issue .ghx-grabber {
      background: repeating-linear-gradient(
        45deg,
        #e80,
        #e80 5px,
        #fd0 5px,
        #fd0 10px
      );
    }
    `;

    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(styleTag);

    const linkTypeHandlers = {
      'depends on': (linkSet, issue) => {
        const linkedIssues = linkSet.querySelectorAll('dd');
        linkedIssues.forEach(linkedIssueLine => {
          const status = linkedIssueLine.querySelector('.status').innerText.toLowerCase();
          if (status !== 'closed') {
            const linkedIssueKey = linkedIssueLine.querySelector('.issue-link.link-title').dataset.issueKey;
            issue.classList.add('custom-blocked-issue');
            const linkedIssue = document.querySelector(`[data-issue-key="${linkedIssueKey}"]`);
            if (linkedIssue) {
              linkedIssue.classList.add('custom-blocking-issue');
            }
          }
        });
      },
      'is depended on by': (linkSet, issue) => {
        const linkedIssues = linkSet.querySelectorAll('dd');
        linkedIssues.forEach(linkedIssueLine => {
          const status = linkedIssueLine.querySelector('.status').innerText.toLowerCase();
          if (status !== 'closed') {
            const linkedIssueKey = linkedIssueLine.querySelector('.issue-link.link-title').dataset.issueKey;
            issue.classList.add('custom-blocking-issue');
            const linkedIssue = document.querySelector(`[data-issue-key="${linkedIssueKey}"]`);
            if (linkedIssue) {
              linkedIssue.classList.add('custom-blocked-issue');
            }
          }
        });
      }
    }

    const allIssues = document.querySelectorAll('.ghx-issue');
    allIssues.forEach(issue => {
      issue.addEventListener('click', () => {
        window.setTimeout(() => {
          // remove blocked/blocking classes from all issues
          allIssues.forEach(i => i.classList.remove('custom-blocking-issue', 'custom-blocked-issue'));

          const detailView = document.querySelector('#ghx-detail-view');
          const linkSets = detailView.querySelectorAll('.links-list');
          
          linkSets.forEach(linkSet => {
            const linkType = linkSet.querySelector('dt').getAttribute('title');
            const handler = linkTypeHandlers[linkType];
            if (handler) {
              handler(linkSet, issue);
            }
          })
        }, 250);
      });
    });
  }
}, 1000);