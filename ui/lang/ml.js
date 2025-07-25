export default {
  isoName: 'ml',
  nativeName: 'മലയാളം',
  label: {
    clear: 'നീക്കുക',
    ok: 'ശരി',
    cancel: 'ഉപേക്ഷിക്കുക',
    close: 'അടയ്ക്കുക',
    set: 'സജ്ജമാക്കുക',
    select: 'തിരഞ്ഞെടുക്കുക',
    reset: 'പുനഃസജ്ജമാക്കുക',
    remove: 'നീക്കംചെയ്യുക',
    update: 'അപ്ഡേറ്റ്',
    create: 'സൃഷ്ടിക്കുക',
    search: 'തിരയുക',
    filter: 'അരിക്കുക',
    refresh: 'പുതുക്കുക',
    expand: label => (label ? `"${ label }" വികസിപ്പിക്കുക` : 'വികസിപ്പിക്കുക'),
    collapse: label => (label ? `"${ label }" ചുരുക്കുക` : 'ചുരുക്കുക')
  },
  date: {
    days: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
    daysShort: 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
    months: 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split(
      '_'
    ),
    monthsShort: 'ജനു_ഫെബ്രു_മാർ_ഏപ്രി_മേയ്_ജൂൺ_ജൂലൈ_ഓഗ_സെപ്_ഒക്_നവ_ഡിസ'.split(
      '_'
    ),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false,
    pluralDay: 'ദിവസങ്ങൾ',
    prevMonth: 'കഴിഞ്ഞ മാസം',
    nextMonth: 'അടുത്ത മാസം',
    prevYear: 'മുൻ വർഷം',
    nextYear: 'അടുത്ത വർഷം',
    today: 'ഇന്നേദിവസം',
    prevRangeYears: range => `മുമ്പത്തെ ${ range } വർഷം`,
    nextRangeYears: range => `അടുത്തത് ${ range } വർഷം`
  },
  table: {
    noData: 'ഡാറ്റ ലഭ്യമല്ല',
    noResults: 'പൊരുത്തമുള്ള റെക്കോർഡുകളൊന്നും കണ്ടെത്തിയില്ല',
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    selectedRecords: rows => (
      rows === 1
        ? 'ഒരു റെക്കോർഡ് തിരഞ്ഞെടുത്തു.'
        : (rows === 0 ? 'റെക്കോര്ഡുകളൊന്നും തിരഞ്ഞെടുത്തിട്ടില്ല' : rows + ' റെക്കോർഡുകൾ തിരഞ്ഞെടുത്തു.')
    ),
    recordsPerPage: 'ഓരോ പേജിലും റെക്കോർഡുകൾ:',
    allRows: 'എല്ലാം',
    pagination: (start, end, total) => start + '-' + end + ' മൊത്തം ' + total + ' ൽ നിന്നും',
    columns: 'നിരകൾ'
  },
  pagination: {
    first: 'ആദ്യ പേജ്',
    prev: 'മുമ്പത്തെ പേജ്',
    next: 'അടുത്ത പേജ്',
    last: 'അവസാന പേജ്'
  },
  editor: {
    url: 'യുആർഎൽ',
    bold: 'ബോൾഡ്',
    italic: 'ഇറ്റാലിക്',
    strikethrough: 'മധ്യത്തിൽ വര',
    underline: 'അടിവര',
    unorderedList: 'ക്രമമില്ലാത്ത പട്ടിക',
    orderedList: 'ക്രമമുള്ള ലിസ്റ്റ്',
    subscript: 'സബ്സ്ക്രിപ്റ്റ്',
    superscript: 'സൂപ്പർസ്ക്രിപ്റ്റ്',
    hyperlink: 'ഹൈപ്പർലിങ്ക്',
    toggleFullscreen: 'ഫുൾസ്ക്രീൻ ടോഗിൾ ചെയ്യുക',
    quote: 'ഉദ്ധരിക്കുക',
    left: 'ഇടത്തേക്ക്',
    center: 'മധ്യഭാഗത്ത് ',
    right: 'വലത്തേക്ക്',
    justify: 'ജസ്റ്റിഫൈ',
    print: 'പ്രിന്റ്',
    outdent: 'ഇൻഡെൻറേഷൻ കുറയ്ക്കുക ',
    indent: 'ഇൻഡെൻറേഷൻ വർദ്ധിപ്പിക്കുക',
    removeFormat: 'ഫോർമാറ്റിംഗ് നീക്കം ചെയ്യുക',
    formatting: 'ഫോർമാറ്റിംഗ്',
    fontSize: 'അക്ഷര വലിപ്പം',
    align: 'വിന്യസിക്കുക',
    hr: 'തിരശ്ചീന റൂൾ ഇൻസേർട്ട് ചെയ്യുക',
    undo: 'പൂർവാവസ്ഥയിലാക്കുക',
    redo: 'വീണ്ടും ചെയ്യുക',
    heading1: 'ഹെഡ്ഡർ 1',
    heading2: 'ഹെഡ്ഡർ 2',
    heading3: 'ഹെഡ്ഡർ 3',
    heading4: 'ഹെഡ്ഡർ 4',
    heading5: 'ഹെഡ്ഡർ 5',
    heading6: 'ഹെഡ്ഡർ 6',
    paragraph: 'ഖണ്ഡിക',
    code: 'കോഡ്',
    size1: 'വളരെ ചെറുത്',
    size2: 'അൽപ്പം ചെറുത്',
    size3: 'സാധാരണ',
    size4: 'മീഡിയം-വലുത്',
    size5: 'വലുത്',
    size6: 'വളരെ വലുത്',
    size7: 'പരമാവധി',
    defaultFont: 'ഡിഫാൾട്ട് ഫോണ്ട്',
    viewSource: 'ഉറവിടം കാണുക'
  },
  tree: {
    noNodes: 'നോഡുകൾ ലഭ്യമല്ല',
    noResults: 'പൊരുത്തപ്പെടുന്ന നോഡുകളൊന്നും കണ്ടെത്തിയില്ല'
  }
}
