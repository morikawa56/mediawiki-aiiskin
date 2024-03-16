<?php
class SkinAii extends SkinMustache {
    public function getTemplateData() {
        $data = parent::getTemplateData();
        $data['aiiskin-footer-icons'] = implode( '',
            array_map(function ( $item ) {
                return $item['html'];
            }, $data['data-footer']['data-icons']['array-items'])
        );

        $sidebar = $data['data-portlets-sidebar'];
        $data['aiiskin-sidebar'] = $sidebar['data-portlets-first']['html-items'] . implode( '',
            array_map(function ( $item ) {
                return $item['html-items'];
            }, $sidebar['array-portlets-rest'])
        );

        $data['aiiskin-lastmod'] = '';
        foreach( $data['data-footer']['data-info']['array-items'] as $item ) {
            if ( $item['name'] === 'lastmod' ) {
                $historyLink = $data['data-portlets']['data-aiiskin-history']['html-items'] ?? '';
                $data['aiiskin-lastmod'] = '<li>' . $item['html'] . '</li>' . $historyLink;
            }
        }

        $data['aiiskin-data-wordmark'] = $data['data-logos']['wordmark'] ?? [];

        return $data + [
            'data-json' => json_encode( $data ),
        ];
    }

    protected function getJsConfigVars() : array {
        return [
            'wgAiiSkinSearchApi' => $this->getConfig()->get( 'AiiSkinSearchApi' )
        ];
    }

    public static function onSkinTemplateNavigation( $sk, &$content_navigation ) {
        // There is no way to render edit icons without history.
        // https://phabricator.wikimedia.org/T283184
        if ( $sk->getSkinName() === 'aiiskin' ) {
            if (isset($content_navigation['views' ]['history'])) {
                $content_navigation['aiiskin-history'] = [
                    'history' => $content_navigation['views' ]['history'],
                ];
                unset( $content_navigation['views' ]['history'] );
            }
            unset( $content_navigation['views' ]['view'] );
        }
    }
}