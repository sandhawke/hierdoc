
function headFunction ({title, canonicalURL}) {
  return (`<!DOCTYPE html><html dir="ltr" lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>${title}</title>
  <link rel="canonical" href="${canonicalURL | ''}" />
  <script src="./openup.js"></script>
  <link rel="stylesheet" href="./part1.css" />
  <link rel="stylesheet" href="respec-mainstyle.css" />
  <link rel="stylesheet" href="./part2.css" />
  <link rel="stylesheet" href="https://www.w3.org/StyleSheets/TR/2016/base" />
  <link rel="stylesheet" href="./spinner.css" />
  <link rel="stylesheet" href="./tooltip.css" />
  <link rel="stylesheet" href="./part3.css" />
</head>
    <body class="h-entry informative">
`)
}

function bodyFunction ({title, abstract, toc, main, isodate, w3cdate, statusName, repo, status, editor, dts = '', date}) {
  const now = date || new Date()
  const month = now.toLocaleDateString('en-US', { month: 'long' })
  if (!w3cdate) w3cdate = `${now.getDate()} ${month} ${now.getYear()+1900}`
  if (!isodate) isodate =  now.toISOString().slice(0,10)
  return `
  <div class="head">
  <a class="logo" href="https://www.w3.org/"><img alt="W3C" src="https://www.w3.org/StyleSheets/TR/2016/logos/W3C" width="72" height="48" /></a> <h1 id="title" class="title p-name">${title}</h1>
      
      <h2>
        W3C ${statusName},
        <time class="dt-published" datetime="${isodate}">${w3cdate}</time>
      </h2>
      <dl>
${dts}
        <!--
        <dt>This version:</dt><dd>
                <a class="u-url" href="https://www.w3.org/TR/2019/UN-credweb-20191124/">https://www.w3.org/TR/2019/UN-credweb-20191124/</a>
              </dd><dt>Latest published version:</dt><dd>
                <a href="https://www.w3.org/TR/credweb/">https://www.w3.org/TR/credweb/</a>
              </dd>
        <dt>Latest editor's draft:</dt><dd><a href="https://credweb.org/signals">https://credweb.org/signals</a></dd>
        
        
        
        
        <dt>Previous version:</dt><dd><a href=""></a></dd>
        -->
        <dt>Editor:</dt>
        <dd class="p-author h-card vcard"><span class="p-name fn">${editor}</span></dd>
        
        
        <dt>Participate:</dt><dd>
      <a href="https://github.com/${repo}/">GitHub ${repo}</a>
    </dd><dd>
      <a href="https://github.com/${repo}/issues/">File a bug</a>
    </dd>
      </dl>
      
      
      
      <p class="copyright">
      <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Copyright">Copyright</a>
      ©
      2020
      
      <a href="https://www.w3.org/"><abbr title="World Wide Web Consortium">W3C</abbr></a><sup>®</sup> (<a href="https://www.csail.mit.edu/"><abbr title="Massachusetts Institute of Technology">MIT</abbr></a>,
      <a href="https://www.ercim.eu/"><abbr title="European Research Consortium for Informatics and Mathematics">ERCIM</abbr></a>, <a href="https://www.keio.ac.jp/">Keio</a>,
      <a href="https://ev.buaa.edu.cn/">Beihang</a>). 
      W3C <a href="https://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer">liability</a>,
      <a href="https://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks">trademark</a> and <a rel="license" href="https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document">permissive document license</a> rules
      apply.
    </p>
      <hr title="Separator for header" />
    </div>
  <div id="abstract" class="introductory"><h2>Abstract</h2>
${abstract}</div>
  <div id="sotd" class="introductory"><h2>Status of This Document</h2><p><em>This section describes the status of this document at the time of its publication. Other documents may supersede this document. A list of current <abbr title="World Wide Web Consortium">W3C</abbr> publications and the latest revision of this technical report can be found in the <a href="https://www.w3.org/TR/"><abbr title="World Wide Web Consortium">W3C</abbr> technical reports index</a> at https://www.w3.org/TR/.</em></p>${status || ''}
      
    <p>
      <a href="https://github.com/${repo}/issues/">GitHub Issues</a> are preferred for
            discussion of this specification.
          
    </p><p>
      Publication as a  does not imply endorsement by the
      <abbr title="World Wide Web Consortium">W3C</abbr> Membership. This is a draft document and may be updated, replaced or
      obsoleted by other documents at any time. It is inappropriate to cite this
      document as other than work in progress.
    </p><p>
      
        This document was produced by a group
        operating under the
        <a href="https://www.w3.org/Consortium/Patent-Policy/"><abbr title="World Wide Web Consortium">W3C</abbr> Patent Policy</a>.
       The group does not expect this document to become a <abbr title="World Wide Web Consortium">W3C</abbr> Recommendation.
      
                  <abbr title="World Wide Web Consortium">W3C</abbr> maintains a
                  <a rel="disclosure" href="">public list of any patent disclosures</a>
            made in connection with the deliverables of
            the group; that page also includes
            instructions for disclosing a patent. An individual who has actual
            knowledge of a patent which the individual believes contains
            <a href="https://www.w3.org/Consortium/Patent-Policy/#def-essential">Essential Claim(s)</a>
            must disclose the information in accordance with
            <a href="https://www.w3.org/Consortium/Patent-Policy/#sec-Disclosure">section 6 of the <abbr title="World Wide Web Consortium">W3C</abbr> Patent Policy</a>.
          
      
    </p><p>
                  This document is governed by the
                  <a id="w3c_process_revision" href="https://www.w3.org/2019/Process-20190301/">1 March 2019 <abbr title="World Wide Web Consortium">W3C</abbr> Process Document</a>.
  </p></div>
  <nav id="toc">
    <h2 class="introductory" id="table-of-contents">Table of Contents</h2>
    <ol class="toc" id="toc-ol">${toc || ''}</ol>
  </nav>
  <div id="main">${main || ''}</div>

  <p role="navigation" id="back-to-top"><a href="#title"><abbr title="Back to Top">↑</abbr></a></p><script src="https://www.w3.org/scripts/TR/2016/fixup.js"></script>
</body></html>
`}

module.exports = { headFunction, bodyFunction }

