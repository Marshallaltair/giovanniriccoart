import guideSource from '../../../Marker-guida.html?raw'

function extractTag(source, tag) {
  const open = source.indexOf('<' + tag)
  const openEnd = source.indexOf('>', open)
  const close = source.indexOf('</' + tag + '>', openEnd)
  return close === -1 ? '' : source.slice(openEnd + 1, close)
}

const guideBody = extractTag(guideSource, 'body')
const guideStyles = extractTag(guideSource, 'style')

export function MarkerGuide() {
  return (
    <article className="marker-guide">
      <style dangerouslySetInnerHTML={{ __html: guideStyles }} />
      <div dangerouslySetInnerHTML={{ __html: guideBody }} />
    </article>
  )
}
